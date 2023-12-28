import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess } from '~/server/errors/either';

export function aMetierService(
	rechercherMetierValue = aMetierOptionList(),
): MetierService {
	return {
		rechercherMetier: jest.fn().mockResolvedValue(createSuccess(rechercherMetierValue)),
	};
}

export function aMetierOptionList(): MetierOption[] {
	return [
		aMetierOption({ code: 'F1201,F1202,I1101', label: 'Conduite de travaux, direction de chantier' }),
		aMetierOption({ code: 'F1106,F1104,I1101', label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)' }),
		aMetierOption({ code: 'H1209,H1504', label: 'Génie électrique' }),
		aMetierOption({ code: 'I1304,I1602', label: 'Aéronautique' }),
		aMetierOption({ code: 'H1201,H1505,H2301', label: 'Chimie' }),
		aMetierOption({ code: 'H1206,H1402', label: 'Electronique, informatique industrielle' }),
		aMetierOption({ code: 'F1106', label: 'Electricité, climatisation, domotique, électronique' }),
		aMetierOption({ code: 'H1206', label: 'Biologie, santé, sciences physiques' }),
		aMetierOption({ code: 'H1302,H1206', label: 'Energie' }),
		aMetierOption({ code: 'I1310,I1502', label: 'Mécanique, maintenance industrielle' }),
		aMetierOption({ code: 'H1208,I1301', label: 'Robotique, systèmes automatisés' }),
	];
}

export function aMetierOption(overrides?: Partial<MetierOption>): MetierOption {
	return {
		code: 'F1201,F1202,I1101',
		label: 'Conduite de travaux, direction de chantier',
		...overrides,
	};
}
