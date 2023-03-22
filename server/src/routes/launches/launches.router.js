const { Router } = require('express');

const {
	httpGetAllLaunches,
	httpAddNewLaunch,
} = require('./launches.controller');

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);

module.exports = launchesRouter;
