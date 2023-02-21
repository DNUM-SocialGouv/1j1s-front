import { Formation } from '~/server/formations/domain/formation';
import { mapNiveauFormation } from '~/server/formations/domain/formation.mapper';

import { ApiLaBonneAlternanceFormationResponse } from './apiLaBonneAlternanceFormation';

export const mapFormation = (response: ApiLaBonneAlternanceFormationResponse): Array<Formation> => {
	return response.results.map((formation) => ({
		nomEntreprise: formation.company?.name,
		tags: [formation.place?.city, mapNiveauFormation(formation.diplomaLevel)],
		titre: formation.title,
	}));
};
