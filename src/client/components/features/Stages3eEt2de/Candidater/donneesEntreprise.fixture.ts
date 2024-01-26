import { DonneesEntreprise } from '~/pages/stages-3e-et-2de/candidater/index.page';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

export function aDonneesEntrepriseStage3eEt2de(override?: Partial<DonneesEntreprise>): DonneesEntreprise {
	return {
		appellations: [
			{
				code: 'code',
				label: 'label',
			},
		],
		modeDeContact: ModeDeContact.IN_PERSON,
		nomEntreprise: 'nomEntreprise',
		siret: 'siret',
		...override,
	};
}
