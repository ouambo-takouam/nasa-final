const { Router } = require('express');

const {
	httpGetAllLaunches,
	httpScheduleLaunch,
	httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpScheduleLaunch);
launchesRouter.delete('/:launchId', httpAbortLaunch);

module.exports = launchesRouter;
