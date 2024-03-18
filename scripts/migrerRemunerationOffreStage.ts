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

async function getPageOffreDeStage(page) {
	const paginationQuery = `pagination[pageSize]=${100}&pagination[page]=${page}`;

	const response = await fetch(`${STRAPI_BASE_URL}api/offres-de-stage?sort[0]=id&${paginationQuery}&publicationState=preview`, {
		method: 'GET',
	}); // preview = draft + published

	return await response.json();
}

async function getOffreDeStageIdAndRemunerationInfo() {
	const result = await getPageOffreDeStage(1);
	const pageCount = result.meta.pagination.pageCount;

	console.log(`Found ${pageCount} pages of offre de stage`);

	const idListAndData = result.data.map((idOffreWithAttributes) => ({
		remunerationBase: idOffreWithAttributes.attributes.remunerationBase,
		remunerationMin: idOffreWithAttributes.attributes.remunerationMin,
		remunerationMax: idOffreWithAttributes.attributes.remunerationMax,
		remunerationPeriode: idOffreWithAttributes.attributes.remunerationPeriode,
		id: idOffreWithAttributes.id,
	}));

	for(let i = 2; i <= pageCount; i++) {
		console.log(`Getting page ${i}/${pageCount}...`);
		const result = await getPageOffreDeStage(i);
		idListAndData.push(...result.data.map((offre) => ({
			remunerationBase: offre.attributes.remunerationBase,
			remunerationMin: offre.attributes.remunerationMin,
			remunerationMax: offre.attributes.remunerationMax,
			remunerationPeriode: offre.attributes.remunerationPeriode,
			id: offre.id,
		})));
	}
	return idListAndData;
}

async function addRemunerationMinMaxAndPeriodToOffreDeStage(token, id, remunerationBase) {
	if (remunerationBase === undefined || remunerationBase === null) return;

	const response = await fetch(`${STRAPI_BASE_URL}api/offres-de-stage/${id}`, {
		method: 'GET',
	});
	const json = await response.json();
	if (json.data?.attributes?.remunerationMin && json.data?.attributes?.remunerationMax) {
		return;
	}

	const body = JSON.stringify({
		data: {
			remunerationMin: remunerationBase,
			remunerationMax: remunerationBase,
			remunerationPeriode: 'MONTHLY',
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
	const offreDeStageDataList = await getOffreDeStageIdAndRemunerationInfo();
	console.log('There is a total of', offreDeStageDataList.length, 'offres de stage');
	for (let index = 0; index < offreDeStageDataList.length; index++) {
		const offre = offreDeStageDataList[index];
		console.log(`Updating ${index + 1}/${offreDeStageDataList.length}... ID = ${offre.id}`);
		const resultOfUpdating = await addRemunerationMinMaxAndPeriodToOffreDeStage(token, offre.id, offre.remunerationBase);
		if (resultOfUpdating === undefined) {
			console.log(`Nothing to update on stage ID ${offre.id}, no remuneration`)
		} else if (resultOfUpdating.error !== undefined) {
			console.log(`An error occurred while updating stage ID ${offre.id} `, resultOfUpdating.error)
			break
		} else {
			console.log(`Updated stage ID ${offre.id} !`);
		}
	}
	if (await isMigrationOk()) {
		console.log('Migration done !')
	} else {
		console.log('Migration failed !');
	}
}

async function isMigrationOk() {
	console.log('Checking if migration was successful...');

	const offreDeStageDataList = await getOffreDeStageIdAndRemunerationInfo();

	for (let index = 0; index < offreDeStageDataList.length; index++) {
		const offre = offreDeStageDataList[index];
		console.log(`Checking ${index + 1}/${offreDeStageDataList.length}...`);
		const remunerationBase = offre.remunerationBase
		const isRemunerationBasePresent = remunerationBase !== null && remunerationBase !== undefined;
		if (isRemunerationBasePresent) {
			const minAndMaxHasSameBaseValue = offre.remunerationMin === remunerationBase && offre.remunerationMax === remunerationBase
			if (!minAndMaxHasSameBaseValue || !offre.remunerationPeriode) {
				console.log(`Migration failed for ${offre.id}`);
				return false;
			}
		}
	}
	console.log('Migration was successful !');
	return true;
}

