import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import { OffreDeStageDéposée } from '~/client/components/features/OffreDeStage/FormulaireDeposerOffre/FormulaireDeposerOffreDeStage.type';
import { Domaines, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

import { HttpClientService } from '../httpClient.service';

export class StageService {

	constructor(private httpClientService: HttpClientService) {}

	async enregistrerOffreDeStage(informationsEntreprise: OffreDeStageDéposée.Entreprise, informationsStage: OffreDeStageDéposée.Stage, informationsLocalisation: OffreDeStageDéposée.Localisation): Promise<Either<void>> {
		const offreDeStage = this.préparerDonnéesOffreDeStage(informationsEntreprise, informationsStage, informationsLocalisation);
		return this.httpClientService.post('stages', offreDeStage);
	};

	private préparerDonnéesOffreDeStage(informationsEntreprise: OffreDeStageDéposée.Entreprise, informationsStage: OffreDeStageDéposée.Stage, informationsLocalisation: OffreDeStageDéposée.Localisation): Partial<OffreDeStageDepot> {
		const urlDeCandidature = informationsStage.lienCandidature.startsWith('http')
			? informationsStage.lienCandidature
			: 'mailto:' + informationsStage.lienCandidature;

		const formData: OffreDeStageDepot = {
			dateDeDebut: informationsStage.dateDebut,
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
