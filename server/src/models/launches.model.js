const launches = new Map();

let latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: 'kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
}

function addNewLaunch(launch) {
	latestFlightNumber++;

	launches.set(latestFlightNumber, {
		flightNumber: latestFlightNumber,
		customers: ['ZTM', 'NASA'],
		upcoming: true,
		success: true,
		...launch,
	});

	return {
		response: 'ok',
	};
}

module.exports = {
	getAllLaunches,
	addNewLaunch,
};