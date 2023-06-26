import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import { Domaines, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

import { HttpClientService } from '../httpClient.service';

export class StageService {

	constructor(private httpClientService: HttpClientService) {}

	async enregistrerOffreDeStage(informationsEntreprise: OffreDeStageDeposee.Entreprise, informationsStage: OffreDeStageDeposee.Stage, informationsLocalisation: OffreDeStageDeposee.Localisation): Promise<Either<void>> {
		const offreDeStage = this.préparerDonnéesOffreDeStage(informationsEntreprise, informationsStage, informationsLocalisation);
		return this.httpClientService.post('stages', offreDeStage);
	};

	private préparerDonnéesOffreDeStage(informationsEntreprise: OffreDeStageDeposee.Entreprise, informationsStage: OffreDeStageDeposee.Stage, informationsLocalisation: OffreDeStageDeposee.Localisation): Partial<OffreDeStageDepot> {
		const urlDeCandidature = informationsStage.lienCandidature.startsWith('http')
			? informationsStage.lienCandidature
			: 'mailto:' + informationsStage.lienCandidature;

		// TODO (DORO 21-06-2023): à supprimer après la mise en place du nouveau modèle de données
		const formData: OffreDeStageDepot = {
			dateDeDebut: informationsStage.dateDeDebutMin,
			dateDeDebutMax: informationsStage.dateDeDebutMax || informationsStage.dateDeDebutMin,
			dateDeDebutMin: informationsStage.dateDeDebutMin,
			description: informationsStage.descriptionOffre,
			domaine: informationsStage.domaineStage as Domaines || Domaines.NON_RENSEIGNE,
			duree: informationsStage.dureeStage,
			employeur: {
				description: informationsEntreprise.descriptionEmployeur,
				email: informationsEntreprise.emailEmployeur,
				logoUrl: informationsEntreprise.logoEmployeur || null,
				nom: informationsEntreprise.nomEmployeur,
				siteUrl: informationsEntreprise.siteEmployeur || null,
			},
			localisation: {
				adresse: informationsLocalisation.adresse,
				codePostal: informationsLocalisation.codePostal,
				departement: informationsLocalisation.departement || null,
				pays: informationsLocalisation.pays,
				region: informationsLocalisation.region || null,
				ville: informationsLocalisation.ville,
			},
			remunerationBase: Number(informationsStage.remunerationStage) ?? null,
			teletravailPossible: informationsStage.teletravail ? informationsStage.teletravail === 'true' : null,
			titre: informationsStage.nomOffre,
			urlDeCandidature,
		};
		return removeNullOrEmptyValue<OffreDeStageDepot>(formData);
	}
}
