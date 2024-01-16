import { CandidatureStage3eEt2de, ModeDeContact } from './candidatureStage3eEt2de';

export function aCandidatureStage3eEt2de(overrides?: Partial<CandidatureStage3eEt2de>): CandidatureStage3eEt2de {
	return {
		appellationCode: '11573',
		email: 'email@example.com',
		modeDeContact: ModeDeContact.PHONE,
		nom: 'Doe',
		prenom: 'John',
		siret: '12345678912345',
		...overrides,
	};
}
