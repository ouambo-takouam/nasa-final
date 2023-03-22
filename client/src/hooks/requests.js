const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	return await response.json();
}

async function httpGetLaunches() {
	const response = await fetch(`${API_URL}/launches`);
	const launches = await response.json();
	return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	try {
		return await fetch(`${API_URL}/launches`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(launch),
		});
	} catch (error) {
		return { ok: false };
	}
}

async function httpAbortLaunch(id) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: 'delete',
		});
	} catch (error) {
		return { ok: false };
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
