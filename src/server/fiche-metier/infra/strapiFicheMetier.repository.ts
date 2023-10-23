import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { getNomMetier, mapFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.mapper';


export const RESOURCE_FICHE_METIER = 'fiche-metiers';
const FICHE_METIER_NOM_METIER_FIELD_NAME = 'nom_metier';
export class StrapiFicheMetierRepository implements FicheMetierRepository {

	constructor(private readonly strapiService: CmsRepository) {
	}

	async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
		const query = `filters[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=deep`;
		const strapiFicheMetier = await this.strapiService.getFirstFromCollectionType<Strapi.CollectionType.FicheMétier>(RESOURCE_FICHE_METIER, query);

		if(isSuccess(strapiFicheMetier))
			return createSuccess(mapFicheMetier(strapiFicheMetier.result));

		return strapiFicheMetier;
	}

	async getAllNomsMetiers(): Promise<Either<Array<string>>> {
		const query = `fields[]=${FICHE_METIER_NOM_METIER_FIELD_NAME}`;

		const strapiFicheMetierCollections = await this.strapiService.getCollectionType<Strapi.CollectionType.FicheMétier>(RESOURCE_FICHE_METIER, query);

		if(isSuccess(strapiFicheMetierCollections))
			return createSuccess(strapiFicheMetierCollections.result.map((strapiCollectionFicheMetier) => getNomMetier(strapiCollectionFicheMetier)));

		return strapiFicheMetierCollections;
	}
}
