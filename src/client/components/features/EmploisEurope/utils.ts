import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export const getTagsFromAnnonce = (emploiEurope: EmploiEurope): string[] => {
	const location = emploiEurope.pays && emploiEurope.ville ? `${emploiEurope.pays}/${emploiEurope.ville}` : emploiEurope.pays ?? emploiEurope.ville;
	const tags = location ? [location] : [];
	const typeContract = emploiEurope.typeContrat;
	if (typeContract) tags.push(typeContract);

	return tags;
};
