const {
	getAllLaunches,
	scheduleLaunch,
	existsLaunch,
	abortLaunch,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
	return res.status(200).json(await getAllLaunches());
}

async function httpScheduleLaunch(req, res) {
	const data = req.body;
	const { mission, rocket, launchDate, target } = req.body;

	if (!mission || !rocket || !launchDate || !target) {
		return res.status(400).json({
			error: 'Missing required launch property',
		});
	}

	data.launchDate = new Date(data.launchDate);

	if (data.launchDate.toString() === 'Invalid Date') {
		return res.status(400).json({
			error: 'Invalid launch date',
		});
	}

	await scheduleLaunch(data);

	return res.status(201).json(data);
}

async function httpAbortLaunch(req, res) {
	const launchId = +req.params.launchId;

	// if launch doesn't exist
	const exists = await existsLaunch(launchId);

	if (!exists) {
		return res.status(404).json({
			error: 'launch not found',
		});
	}

	const response = await abortLaunch(launchId);

	if (!response) {
		return res.status(400).json({
			error: 'Launch not aborted',
		});
	}

	return res.status(200).json({
		ok: true,
	});
}

module.exports = {
	httpGetAllLaunches,
	httpScheduleLaunch,
	httpAbortLaunch,
};
