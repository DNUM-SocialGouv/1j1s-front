import { Option } from '~/client/components/ui/Select/Select';

const AGE_MINIMUM = 16;

export const ageOptions: Option[] = Array.from(Array(15).keys()).map((index) => {
	const age = index + AGE_MINIMUM;
	return {
		libellé: `${age} ans`,
		valeur: `${age}`,
	};
});
