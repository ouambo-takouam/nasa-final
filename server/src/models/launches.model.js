const Launch = require('./launches.mongo');
const Planet = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

// function existsLaunchWithId(launchId) {
// 	return launches.has(launchId);
// }

async function getLatestFlightNumber() {
	const latestLaunch = await Launch.findOne().sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function getAllLaunches() {
	return await Launch.find({}, '-_id -__v');
}

async function saveLaunch(launch) {
	const planet = await Planet.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error('No matching planet found');
	}

	await Launch.updateOne({ flightNumber: launch.flightNumber }, launch, {
		upsert: true,
	});
}

async function scheduleLaunch(data) {
	const latestFlightNumber = await getLatestFlightNumber();

	const launch = {
		flightNumber: latestFlightNumber + 1,
		customers: ['ZTM', 'NASA'],
		upcoming: true,
		success: true,
		...data,
	};

	saveLaunch(launch);
}

// function abortLaunchById(launchId) {
// 	const aborted = launches.get(launchId);
// 	aborted.upcoming = false;
// 	aborted.success = false;

// 	return aborted;
// }

module.exports = {
	getAllLaunches,
	scheduleLaunch,
	// existsLaunchWithId,
	// abortLaunchById,
};
