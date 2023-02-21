import {
	AlternanceApiJobsResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';


export const aMetierLaBonneAlternanceApiResponse = (): MetierLaBonneAlternanceApiResponse => {
	return {
		labelsAndRomes: [
			{ label: 'Conduite de travaux, direction de chantier', romes: ['F1201', 'F1202', 'I1101'] },
			{ label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)', romes: ['F1106', 'F1104', 'I1101'] },
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
			{ label: 'Aéronautique', romes: ['I1304', 'I1602'] },
			{ label: 'Chimie', romes: ['H1201', 'H1505', 'H2301'] },
			{ label: 'Electronique, informatique industrielle', romes: ['H1206', 'H1402'] },
			{ label: 'Electricité, climatisation, domotique, électronique', romes: ['F1106'] },
			{ label: 'Biologie, santé, sciences physiques', romes: ['H1206'] },
			{ label: 'Energie', romes: ['H1302', 'H1206'] },
			{ label: 'Mécanique, maintenance industrielle', romes: ['I1310', 'I1502'] },
			{ label: 'Robotique, systèmes automatisés', romes: ['H1208', 'I1301'] },
		],
	};
};

export const aLaBonneAlternanceApiJobsResponse = (): AlternanceApiJobsResponse => {
	return {
		matchas: {
			results: [
				{
					company: { name: 'une entreprise' },
					diplomaLevel: 'débutant',
					job: { contractType: ['Apprentissage'] },
					place: { city: 'paris' },
					title: 'un titre',
				},
				{
					company: {
						name: 'SARL HUGUE-DEBRIX',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: ['Apprentissage'] },
					title: 'Boucher-charcutier / Bouchère-charcutière',
				},
				{
					company: {
						name: 'MONSIEUR MICHEL',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: ['Apprentissage'] },
					title: 'Ouvrier boulanger / Ouvrière boulangère',
				},
			],
		},
		peJobs: {
			results: [
				{
					company: { name: 'une entreprise' },
					job: { contractType: 'CDD' },
					place: { city: 'paris' },
					title: 'un titre',
				},
			],
		},
	};
};
