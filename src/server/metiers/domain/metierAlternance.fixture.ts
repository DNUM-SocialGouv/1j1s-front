import { MetierAlternance } from '~/server/metiers/domain/metierAlternance';

export function aListeDeMetierLaBonneAlternance(): Array<MetierAlternance> {
	return [
		{ codeRomes: ['F1201', 'F1202', 'I1101'], label: 'Conduite de travaux, direction de chantier' },
		{ codeRomes: ['F1106', 'F1104', 'I1101'], label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)' },
		{ codeRomes: ['H1209', 'H1504'], label: 'Génie électrique' },
		{ codeRomes: ['I1304', 'I1602'], label: 'Aéronautique' },
		{ codeRomes: ['H1201', 'H1505', 'H2301'], label: 'Chimie' },
		{ codeRomes: ['H1206', 'H1402'], label: 'Electronique, informatique industrielle' },
		{ codeRomes: ['F1106'], label: 'Electricité, climatisation, domotique, électronique' },
		{ codeRomes: ['H1206'], label: 'Biologie, santé, sciences physiques' },
		{ codeRomes: ['H1302', 'H1206'], label: 'Energie' },
		{ codeRomes: ['I1310', 'I1502'], label: 'Mécanique, maintenance industrielle' },
		{ codeRomes: ['H1208', 'I1301'], label: 'Robotique, systèmes automatisés' },
	];
}

export function aMetier(override: Partial<MetierAlternance>): MetierAlternance {
	return {
		codeRomes: ['F1201', 'F1202', 'I1101'],
		label: 'Conduite de travaux, direction de chantier',
		...override,
	};
}
