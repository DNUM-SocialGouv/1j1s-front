import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { mapFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier.mapper';


const RESOURCE_FICHE_METIER = 'fiche-metiers';
export class StrapiFicheMetierRepository implements FicheMetierRepository{
	constructor(private readonly strapiRepository: StrapiRepository) {
	}
	async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
		const query = `filters[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=deep`;
		const ficheMétierList = await this.strapiRepository.getCollectionType<Strapi.CollectionType.FicheMétier, FicheMétier>(RESOURCE_FICHE_METIER, query, mapFicheMetier);
		return this.strapiRepository.getFirstFromCollection(ficheMétierList);
	}

	async listAllFicheMetierNomMetier(): Promise<Either<Array<string>>> {
		const FICHE_METIER_NOM_METIER_FIELD_NAME = 'nom_metier';
		const query = `fields[]=${FICHE_METIER_NOM_METIER_FIELD_NAME}`;
		const flatMapNomMetier = (strapiFicheMetier: Strapi.CollectionType.FicheMétier): string => strapiFicheMetier.nom_metier;
		return this.strapiRepository.getCollectionType<Strapi.CollectionType.FicheMétier, string>(RESOURCE_FICHE_METIER, query, flatMapNomMetier);
	}
}
