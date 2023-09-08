import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { flatMapNomMetier, mapFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.mapper';


export const RESOURCE_FICHE_METIER = 'fiche-metiers';
const FICHE_METIER_NOM_METIER_FIELD_NAME = 'nom_metier';
export class StrapiFicheMetierRepository implements FicheMetierRepository {

	constructor(private readonly strapiRepository: StrapiRepository) {
	}

	async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
		const query = `filters[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=deep`;
		return this.strapiRepository.getFirstFromCollectionType<Strapi.CollectionType.FicheMétier, FicheMétier>(RESOURCE_FICHE_METIER, query, mapFicheMetier);
	}

	async getAllNomsMetiers(): Promise<Either<Array<string>>> {
		const query = `fields[]=${FICHE_METIER_NOM_METIER_FIELD_NAME}`;

		return this.strapiRepository.getCollectionType<Strapi.CollectionType.FicheMétier, string>(RESOURCE_FICHE_METIER, query, flatMapNomMetier);
	}
}
