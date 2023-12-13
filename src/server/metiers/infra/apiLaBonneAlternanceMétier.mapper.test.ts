import { MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { aMetier } from '~/server/metiers/domain/métier.fixture';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';
import { mapMetier } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.mapper';

describe('mapMetier', () => {
	it('converti une response en liste de métiers', () => {
		const responseAPI: MetierLaBonneAlternanceApiResponse = aMetierLaBonneAlternanceApiResponse();

		const result = mapMetier(responseAPI);

		expect(result).toEqual([
			aMetier({ code: [new MetierCodeRome('F1201'), new MetierCodeRome('F1202'), new MetierCodeRome('I1101')], label: 'Conduite de travaux, direction de chantier' }),
			aMetier({ code: [new MetierCodeRome('F1106'), new MetierCodeRome('F1104'), new MetierCodeRome('I1101')], label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)' }),
			aMetier({ code: [new MetierCodeRome('H1209'), new MetierCodeRome('H1504')], label: 'Génie électrique' }),
			aMetier({ code: [new MetierCodeRome('I1304'), new MetierCodeRome('I1602')], label: 'Aéronautique' }),
			aMetier({ code: [new MetierCodeRome('H1201'), new MetierCodeRome('H1505'), new MetierCodeRome('H2301')], label: 'Chimie' }),
			aMetier({ code: [new MetierCodeRome('H1206'), new MetierCodeRome('H1402')], label: 'Electronique, informatique industrielle' }),
			aMetier({ code: [new MetierCodeRome('F1106')], label: 'Electricité, climatisation, domotique, électronique' }),
			aMetier({ code: [new MetierCodeRome('H1206')], label: 'Biologie, santé, sciences physiques' }),
			aMetier({ code: [new MetierCodeRome('H1302'), new MetierCodeRome('H1206')], label: 'Energie' }),
			aMetier({ code: [new MetierCodeRome('I1310'), new MetierCodeRome('I1502')], label: 'Mécanique, maintenance industrielle' }),
			aMetier({ code: [new MetierCodeRome('H1208'), new MetierCodeRome('I1301')], label: 'Robotique, systèmes automatisés' }),
		]);
	});
});
