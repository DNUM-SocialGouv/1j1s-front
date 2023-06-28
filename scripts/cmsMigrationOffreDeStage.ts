/* eslint-disable */
console.log(`This migration is going to affect ${process.env.STRAPI_BASE_URL}`);
console.log('Is this the correct URL? (y/n)');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('', (answer) => {
	if (answer !== 'y') {
		console.log('Aborting');
		process.exit(1);
	}
	readline.close();
	doMigration();
});


const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL.replace('localhost', '127.0.0.1');
const [login, password] = process.env.STRAPI_AUTH.split(':');

async function getToken() {
	const response = await fetch(`${STRAPI_BASE_URL}/api/auth/local`, {
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

async function getPageOffreDeStage(page) {
	const paginationQuery = `pagination[pageSize]=${100}&pagination[page]=${page}`;

	const response = await fetch(`${STRAPI_BASE_URL}/api/offres-de-stage?sort[0]=Index&${paginationQuery}&publicationState=preview`, {
		method: 'GET',
	});

	return await response.json();
}

async function getOffreDeStageIdListAndDate() {
	const result = await getPageOffreDeStage(1);
	const pageCount = result.meta.pagination.pageCount;

	console.log(`Found ${pageCount} pages of offre de stage`);

	const idListAndData = result.data.map((offre) => ({
		dateDeDebut: offre.attributes.dateDeDebut,
		id: offre.id,
	}));

	for(let i = 2; i <= pageCount; i++) {
		console.log(`Getting page ${i}/${pageCount}...`);
		const result = await getPageOffreDeStage(i);
		idListAndData.push(...result.data.map((offre) => ({
			dateDeDebut: offre.attributes.dateDeDebut,
			id: offre.id,
		})));
	}
	return idListAndData;
}

async function addDateMinMaxToOffreDeStage(token, id, dateDeDebut) {
	if (!dateDeDebut) return;

	const response = await fetch(`${STRAPI_BASE_URL}/api/offres-de-stage/${id}`, {
		method: 'GET',
	});
	const json = await response.json();
	if (json.data?.attributes?.dateDeDebutMax || json.data?.attributes?.dateDeDebutMin) {
		console.log('Already has dateDeDebutMax or dateDeDebutMin, skipping...');
		return;
	}

	const body = JSON.stringify({
		data: {
			dateDeDebutMax: dateDeDebut,
			dateDeDebutMin: dateDeDebut,
		},
	});

	const result = await fetch(`${STRAPI_BASE_URL}/api/offres-de-stage/${id}`, {
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

	console.log('Getting offre de stage id list and date...');
	const offreDeStageDataList = await getOffreDeStageIdListAndDate();
	console.log('There is a total of', offreDeStageDataList.length, 'offres de stage');
	for (let index = 0; index < offreDeStageDataList.length; index++) {
		const offre = offreDeStageDataList[index];
		console.log(`Updating ${index + 1}/${offreDeStageDataList.length}...`);
		await addDateMinMaxToOffreDeStage(token, offre.id, offre.dateDeDebut);
		console.log(`Updated ${index + 1}/${offreDeStageDataList.length} !`);
	}
	await isMigrationOk()
	console.log('Migration done !');
}

async function isMigrationOk() {
	console.log('Checking if migration was successful...');

	const offreDeStageDataList = await getOffreDeStageIdListAndDate();

	for (let index = 0; index < offreDeStageDataList.length; index++) {
		const offre = offreDeStageDataList[index];
		const response = await fetch(`${STRAPI_BASE_URL}/api/offres-de-stage/${offre.id}`, {
			method: 'GET',
		});
		const json = await response.json();
		console.log(`Checking ${index + 1}/${offreDeStageDataList.length}...`);
		if (!json.data?.attributes?.dateDeDebut || !json.data?.attributes?.dateDeDebutMax || !json.data?.attributes?.dateDeDebutMin) {
			console.log(`Migration failed for ${offre.id}`);
			return false;
		}
	}
	console.log('Migration was successful !');
	return true;
}
