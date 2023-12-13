import { MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { MetierLba } from '~/server/metiers/domain/metier';

export function aListeDeMetierLaBonneAlternance(): Array<MetierLba> {
	return [
		{ code: [new MetierCodeRome('F1201'), new MetierCodeRome('F1202'), new MetierCodeRome('I1101')], label: 'Conduite de travaux, direction de chantier' },
		{ code: [new MetierCodeRome('F1106'), new MetierCodeRome('F1104'), new MetierCodeRome('I1101')], label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)' },
		{ code: [new MetierCodeRome('H1209'), new MetierCodeRome('H1504')], label: 'Génie électrique' },
		{ code: [new MetierCodeRome('I1304'), new MetierCodeRome('I1602')], label: 'Aéronautique' },
		{ code: [new MetierCodeRome('H1201'), new MetierCodeRome('H1505'), new MetierCodeRome('H2301')], label: 'Chimie' },
		{ code: [new MetierCodeRome('H1206'), new MetierCodeRome('H1402')], label: 'Electronique, informatique industrielle' },
		{ code: [new MetierCodeRome('F1106')], label: 'Electricité, climatisation, domotique, électronique' },
		{ code: [new MetierCodeRome('H1206')], label: 'Biologie, santé, sciences physiques' },
		{ code: [new MetierCodeRome('H1302'), new MetierCodeRome('H1206')], label: 'Energie' },
		{ code: [new MetierCodeRome('I1310'), new MetierCodeRome('I1502')], label: 'Mécanique, maintenance industrielle' },
		{ code: [new MetierCodeRome('H1208'), new MetierCodeRome('I1301')], label: 'Robotique, systèmes automatisés' },
	];
}

export function aMetier(override: Partial<MetierLba>): MetierLba {
	return {
		code: [new MetierCodeRome('F1201'), new MetierCodeRome('F1202'), new MetierCodeRome('I1101')],
		label: 'Conduite de travaux, direction de chantier',
		...override,
	};
}
