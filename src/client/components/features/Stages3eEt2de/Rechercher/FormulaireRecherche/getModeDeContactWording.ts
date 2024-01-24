import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

export function getModeDeContactWording(modeDeContact: ModeDeContact): string | undefined {
	switch (modeDeContact) {
		case ModeDeContact.IN_PERSON:
			return 'Candidature en personne';
		case ModeDeContact.EMAIL:
			return 'Candidature par e-mail';
		case ModeDeContact.PHONE:
			return 'Candidature par téléphone';
		default:
			return undefined;
	}
}
