const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const Planet = require('./planets.mongo');

function isHabitablePlanet(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (planet) => {
				if (isHabitablePlanet(planet)) {
					await savePlanet(planet);
				}
			})
			.on('error', (error) => {
				reject(error);
			})
			.on('end', () => {
				resolve();
			});
	});
}

async function savePlanet(planet) {
	try {
		await Planet.updateOne(
			{ keplerName: planet.kepler_name },
			{ keplerName: planet.kepler_name },
			{ upsert: true }
		);
	} catch (error) {
		console.error(`Could not save a planet ${error}`);
	}
}

async function getAllPlanets() {
	return await Planet.find({}, '-_id -__v');
}

module.exports = {
	loadPlanetsData,
	getAllPlanets,
};
