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
	}); // preview = draft + published

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

async function addRemunerationMinMaxAndPeriodToOffreDeStage(token, id, remunerationBase) {
	if (!remunerationBase) return;

	const response = await fetch(`${STRAPI_BASE_URL}/api/offres-de-stage/${id}`, {
		method: 'GET',
	});
	const json = await response.json();
	if (json.data?.attributes?.remunerationMin && json.data?.attributes?.remunerationMax) {
		console.log(`Already has remunerationMin and remunerationMax, skipping offre ${id}`);
		return;
	}

	const body = JSON.stringify({
		data: {
			remunerationMin: remunerationBase,
			remunerationMax: remunerationBase,
			remunerationPeriode: 'MONTHLY',
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

	console.log('Getting offre de stage id list and remuneration ...');
	const offreDeStageDataList = await getOffreDeStageIdListAndDate();
	console.log('There is a total of', offreDeStageDataList.length, 'offres de stage');
	for (let index = 0; index < offreDeStageDataList.length; index++) {
		const offre = offreDeStageDataList[index];
		console.log(`Updating ${index + 1}/${offreDeStageDataList.length}...`);
		await addRemunerationMinMaxAndPeriodToOffreDeStage(token, offre.id, offre.remunerationBase);
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
		// todo peut être pas la bonne vérif de si la migration s'est bien passée ou non car certaines offres n'ont pas de remunerationBase
		if (!json.data?.attributes?.remunerationMin || !json.data?.attributes?.remunerationMax || !json.data?.attributes?.remunerationPeriode) {
			console.log(`Migration failed for ${offre.id}`);
			return false;
		}
	}
	console.log('Migration was successful !');
	return true;
}

// est ce qu'on eut migrer les hellowork aussi avec ce script ? si oui il faut l'ajouter
