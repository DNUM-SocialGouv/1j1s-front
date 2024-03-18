/* eslint-disable */
console.log(`This migration is going to affect ${process.env.STRAPI_BASE_URL}`);
console.log('Is this the correct URL? (Y/n)');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('', (answer) => {
	if (answer !== 'Y') {
		console.log('Aborting');
		process.exit(1);
	}
	readline.close();
	doMigration();
});


const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL.replace('localhost', '127.0.0.1');
const [login, password] = process.env.STRAPI_ETL_AUTH.split(':');

async function getToken() {
	const response = await fetch(`${STRAPI_BASE_URL}api/auth/local`, {
		body: JSON.stringify({
			identifier: login,
			password: password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const json = await response.json();
	return json.jwt;
}

async function getPageOffreDeStageHellowork(page) {
	const paginationQuery = `pagination[pageSize]=${100}&pagination[page]=${page}&filters[source][$eq]=hellowork`;

	const response = await fetch(`${STRAPI_BASE_URL}api/offres-de-stage?sort[0]=id&${paginationQuery}&publicationState=preview`, {
		method: 'GET',
	}); // preview = draft + published

	return await response.json();
}

async function getAllOffreDeStageHellowork() {
	const result = await getPageOffreDeStageHellowork(1);
	const pageCount = result.meta.pagination.pageCount;

	console.log(`Found ${pageCount} pages of offre de stage`);

	const ids = result.data.map((idOffre) => ({
		id: idOffre.id,
	}));

	for(let i = 2; i <= pageCount; i++) {
		console.log(`Getting page ${i}/${pageCount}...`);
		const result = await getPageOffreDeStageHellowork(i);
		ids.push(...result.data.map((offre) => ({
			id: offre.id,
		})));
	}
	return ids;
}

async function updateWithOldSourceUpdatedAtDate(token, id) {
	const body = JSON.stringify({
		data: {
			sourceUpdatedAt: new Date("2000-01-01"),
		},
	});

	const result = await fetch(`${STRAPI_BASE_URL}api/offres-de-stage/${id}`, {
		body: body,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		method: 'PUT',
	});
	return await result.json();
}

async function doMigration() {
	console.log('Starting migration...');
	const token = await getToken();

	console.log('Getting offre de stage id list and remuneration ...');
	const offreStageHelloWorkIds = await getAllOffreDeStageHellowork();
	console.log('There is a total of', offreStageHelloWorkIds.length, 'offres de stage from hellowork');
	for (let index = 0; index < offreStageHelloWorkIds.length; index++) {
		const offre = offreStageHelloWorkIds[index];
		console.log(`Updating ${index + 1}/${offreStageHelloWorkIds.length}... ID = ${offre.id}`);
		const resultOfUpdating = await updateWithOldSourceUpdatedAtDate(token, offre.id);
		if (resultOfUpdating === undefined) {
			console.log(`Nothing to update on stage ID ${offre.id}, no remuneration`)
		} else if (resultOfUpdating.error !== undefined) {
			console.log(`An error occurred while updating stage ID ${offre.id} `, resultOfUpdating.error)
			break
		} else {
			console.log(`Updated stage ID ${offre.id} !`);
		}
	}
	// await isMigrationOk()
	console.log('Migration done !');
}

