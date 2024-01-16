import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { StageService } from '~/client/services/stage/stage.service';
import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import { Either } from '~/server/errors/either';
import { OffreStageDepot } from '~/server/stages/domain/stages';

import { HttpClientService } from '../httpClient.service';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;
import { DomainesStage } from '~/server/stages/repository/domainesStage';

export class BffStageService implements StageService {
	constructor(private httpClientService: HttpClientService) {
	}

	async enregistrerOffreDeStage(informationsEntreprise: OffreDeStageDeposee.Entreprise, informationsStage: OffreDeStageDeposee.Stage, informationsLocalisation: OffreDeStageDeposee.Localisation): Promise<Either<void>> {
		const offreDeStage = this.préparerDonnéesOffreDeStage(informationsEntreprise, informationsStage, informationsLocalisation);
		return this.httpClientService.post('stages', offreDeStage);
	};

	private préparerDonnéesOffreDeStage(informationsEntreprise: OffreDeStageDeposee.Entreprise, informationsStage: OffreDeStageDeposee.Stage, informationsLocalisation: OffreDeStageDeposee.Localisation): Partial<OffreDeStageDepot> {
		const urlDeCandidature = informationsStage.lienCandidature.startsWith('http')
			? informationsStage.lienCandidature
			: 'mailto:' + informationsStage.lienCandidature;

		const formData: OffreDeStageDepot = {
			dateDeDebutMax: informationsStage.dateDeDebutMax,
			dateDeDebutMin: informationsStage.dateDeDebutMin,
			description: informationsStage.descriptionOffre,
			domaine: informationsStage.domaineStage || DomainesStage.NON_RENSEIGNE,
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

