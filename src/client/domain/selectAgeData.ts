import { Option } from '~/client/components/ui/Form/Select/Select';
import { ACCOMPAGNEMENT_MAX_AGE, ACCOMPAGNEMENT_MIN_AGE } from '~/server/demande-de-contact/domain/demandeDeContact';

const numberOfDifferentsAges = ACCOMPAGNEMENT_MAX_AGE-ACCOMPAGNEMENT_MIN_AGE+1;
export const ageOptions: Option[] = Array.from(Array(numberOfDifferentsAges).keys()).map((index) => {
	const age = index + ACCOMPAGNEMENT_MIN_AGE;
	return {
		libellé: `${age} ans`,
		valeur: `${age}`,
	};
});
