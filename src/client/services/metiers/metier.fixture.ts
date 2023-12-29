import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess } from '~/server/errors/either';

export function aMetierService(
	rechercherMetierValue = aMetiersList(),
): MetierService {
	return {
		rechercherMetier: jest.fn().mockResolvedValue(createSuccess(rechercherMetierValue)),
	};
}

export function aMetiersList(): Metier[] {
	return [
		aMetier({ code: 'F1201,F1202,I1101', label: 'Conduite de travaux, direction de chantier' }),
		aMetier({ code: 'F1106,F1104,I1101', label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)' }),
		aMetier({ code: 'H1209,H1504', label: 'Génie électrique' }),
		aMetier({ code: 'I1304,I1602', label: 'Aéronautique' }),
		aMetier({ code: 'H1201,H1505,H2301', label: 'Chimie' }),
		aMetier({ code: 'H1206,H1402', label: 'Electronique, informatique industrielle' }),
		aMetier({ code: 'F1106', label: 'Electricité, climatisation, domotique, électronique' }),
		aMetier({ code: 'H1206', label: 'Biologie, santé, sciences physiques' }),
		aMetier({ code: 'H1302,H1206', label: 'Energie' }),
		aMetier({ code: 'I1310,I1502', label: 'Mécanique, maintenance industrielle' }),
		aMetier({ code: 'H1208,I1301', label: 'Robotique, systèmes automatisés' }),
	];
}

export function aMetier(overrides?: Partial<Metier>): Metier {
	return {
		code: 'F1201,F1202,I1101',
		label: 'Conduite de travaux, direction de chantier',
		...overrides,
	};
}
