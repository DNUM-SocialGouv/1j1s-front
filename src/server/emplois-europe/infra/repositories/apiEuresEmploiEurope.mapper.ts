import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { paysEuropeList } from '~/client/domain/pays';
import {
	CompetenceLinguistique,
	EmploiEurope,
	ExperienceNecessaire,
	LanguageSpecificationCompetence,
	ResultatRechercheEmploiEurope,
} from '~/server/emplois-europe/domain/emploiEurope';
import {
	langageCompetenceName,
	langageParPaysEures,
	LEVEL_CODE,
	niveauLangage,
} from '~/server/emplois-europe/infra/langageEures';
import {
	ApiEuresEmploiEuropeDetailItem,
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { EURES_CONTRACT_TYPE, typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';
import { XmlService } from '~/server/services/xml/xml.service';
import CompetencyDimension = ApiEuresEmploiEuropeDetailXML.CompetencyDimension
import WorkingLanguageCode = ApiEuresEmploiEuropeDetailXML.WorkingLanguageCode
import PositionProfile = ApiEuresEmploiEuropeDetailXML.PositionProfile
import PositionQualifications = ApiEuresEmploiEuropeDetailXML.PositionQualifications
import PositionOrganization = ApiEuresEmploiEuropeDetailXML.PositionOrganization
import ExperienceCategory = ApiEuresEmploiEuropeDetailXML.ExperienceCategory


export class ApiEuresEmploiEuropeMapper {
	constructor(
		private readonly xmlService: XmlService,
	) {
	}

	private findItemByHandle(items: Array<ApiEuresEmploiEuropeDetailItem>, handle: string) {
		return items.find((detail) => detail.jobVacancy.header.handle === handle);
	}

	public mapRechercheEmploiEurope(reponseRecherche: ApiEuresEmploiEuropeRechercheResponse, reponseDetailRecherche: ApiEuresEmploiEuropeDetailResponse): ResultatRechercheEmploiEurope {
		return {
			nombreResultats: reponseRecherche.data.dataSetInfo.totalMatchingCount,
			offreList: reponseRecherche.data.items.map((item): EmploiEurope => {
				const handle = item.header.handle;

				const itemDetail = this.findItemByHandle(reponseDetailRecherche.data.items, handle);
				return this.mapDetailOffre(handle, itemDetail);
			}),
		};
	}


	public mapDetailOffre = (handle: string, item?: ApiEuresEmploiEuropeDetailItem): EmploiEurope => {
		const itemDetailParsed = this.xmlService.parse<ApiEuresEmploiEuropeDetailXML>(item?.jobVacancy.hrxml);

		const positionOpening = this.getElementOrFirstElementInArray(itemDetailParsed?.PositionOpening);
		const positionProfile = this.getElementOrFirstElementInArray(positionOpening?.PositionProfile);
		const positionQualifications = this.getElementOrFirstElementInArray(positionProfile?.PositionQualifications);
		const positionOrganization = this.getElementOrFirstElementInArray(positionProfile?.PositionOrganization);

		const codeLangueDeLOffre = positionProfile?.attributs?.languageCode;

		const nomEntreprise = this.getNomEntreprise(positionOrganization);
		const titre = positionProfile?.PositionTitle && this.xmlService.getTextValue(positionProfile.PositionTitle);
		const descriptionDeLOffre = this.getDescription(positionProfile);
		const localisations = this.getLocalisations(positionProfile);

		const typeContrat = this.getTypeDeContrat(positionProfile);
		const tempsDeTravail = this.getTempsDeTravail(positionProfile);

		const niveauEtudes = this.getNiveauEtude(positionQualifications);
		const langueDeTravail = this.getLangueDeTravail(positionProfile?.WorkingLanguageCode);
		const competencesLinguistiques = this.getCompetencesLinguistiques(positionQualifications);
		const experienceNecessaire = this.getExperienceNecessaire(positionQualifications);
		const listePermisDeConduire = this.getListePermisDeConduire(positionQualifications);

		return {
			codeLangueDeLOffre,
			competencesLinguistiques,
			description: descriptionDeLOffre,
			id: handle,
			laPlusLongueExperienceNecessaire: experienceNecessaire,
			langueDeTravail,
			listePermis: listePermisDeConduire,
			localisations,
			niveauEtudes,
			nomEntreprise,
			tempsDeTravail,
			titre,
			typeContrat,
			urlCandidature: item?.related.urls[0].urlValue,
		};
	};

	private getNomEntreprise(positionOrganization?: PositionOrganization) {
		const organizationIdentifiers = this.getElementOrFirstElementInArray(positionOrganization?.OrganizationIdentifiers);
		const organizationName = organizationIdentifiers?.OrganizationName;
		return organizationName && this.xmlService.getTextValue(organizationName);
	}

	private getDescription(positionProfile?: PositionProfile) {
		const positionDescription = this.getElementOrFirstElementInArray(positionProfile?.PositionFormattedDescription);
		const descriptionOffer = positionDescription?.Content;
		return descriptionOffer && this.xmlService.getTextValue(descriptionOffer);
	}

	private getLocalisations(positionProfile?: PositionProfile) {
		//TODO transformer en parsing de plusieurs valeurs
		const positionLocation = this.getElementOrFirstElementInArray(positionProfile?.PositionLocation);
		const address = this.getElementOrFirstElementInArray(positionLocation?.Address);

		const countryCode = address?.CountryCode && this.xmlService.getTextValue(address.CountryCode);
		const country = countryCode ? paysEuropeList.find((pays) => pays.code === countryCode)?.libellé : undefined;

		const cityName = address?.CityName;
		const city = cityName && this.xmlService.getTextValue(cityName);

		return [{ pays: country, ville: city }];
	}

	private getTypeDeContrat(positionProfile?: PositionProfile) {
		function mapContractType(positionOfferingTypeCode?: string) {
			if (positionOfferingTypeCode === EURES_CONTRACT_TYPE.NS)
				return undefined;
			return typesContratEures.find(
				(typeContratEures) => typeContratEures.valeur === positionOfferingTypeCode)?.libellé;
		}

		const positionOfferingTypeCode = this.getElementOrFirstElementInArray(positionProfile?.PositionOfferingTypeCode);
		const positionOfferingTypeCodeText = positionOfferingTypeCode && this.xmlService.getTextValue(positionOfferingTypeCode);
		return mapContractType(positionOfferingTypeCodeText);
	}

	private getTempsDeTravail(positionProfile?: PositionProfile) {
		function mapTempsDeTravail(positionScheduleTypeCode?: string) {
			return tempsDeTravailEures.find(
				(tempsDeTravail) => tempsDeTravail.valeur === positionScheduleTypeCode)?.libellé;
		}

		const positionScheduleTypeCode = this.getElementOrFirstElementInArray(positionProfile?.PositionScheduleTypeCode);
		const positionScheduleTypeCodeText = positionScheduleTypeCode && this.xmlService.getTextValue(positionScheduleTypeCode);
		return mapTempsDeTravail(positionScheduleTypeCodeText);
	}

	private getNiveauEtude(positionQualifications?: PositionQualifications) {
		function mapNiveauEtudes(educationLevelCode?: number) {
			return niveauEtudesEures.find(
				(niveauEtudes) => niveauEtudes.valeur === educationLevelCode?.toString())?.libellé;
		}

		const educationRequirement = this.getElementOrFirstElementInArray(positionQualifications?.EducationRequirement);
		const educationLevelCode = this.getElementOrFirstElementInArray(educationRequirement?.EducationLevelCode);
		const educationLevelCodeText = educationLevelCode && this.xmlService.getTextValue(educationLevelCode);
		return mapNiveauEtudes(educationLevelCodeText);
	}

	private getLangueDeTravail(workingLanguageCode?: WorkingLanguageCode | Array<WorkingLanguageCode>) {
		if (!workingLanguageCode) return [];

		const listWorkingLanguageName: Array<string> = [];
		const listWorkingLanguage = this.transformElementToArray<WorkingLanguageCode>(workingLanguageCode);

		function findWorkingLanguageName(workingLanguageCode: string) {
			return langageParPaysEures.find(
				(langage) => langage.codeValue === workingLanguageCode.toLowerCase(),
			)?.codeDescription;
		}

		listWorkingLanguage.map((workingLanguage) => {
			const workingLanguageText = this.xmlService.getTextValue(workingLanguage);
			const workingLanguageName = findWorkingLanguageName(workingLanguageText);
			if (workingLanguageName) listWorkingLanguageName.push(workingLanguageName);
		});

		return listWorkingLanguageName;
	}

	private getCompetencesLinguistiques(positionQualifications?: PositionQualifications) {
		function findLanguageLevel(levelCode?: LEVEL_CODE) {
			return niveauLangage.find((niveau) => niveau.valeur === levelCode);
		}

		function findLanguageNameCompetency(compentencyId: string) {
			return langageParPaysEures.find((langage) => langage.codeValue === compentencyId)?.codeDescription;
		}

		const positionsCompetencies = positionQualifications?.PositionCompetency;
		if (!positionsCompetencies) return [];

		const TAXONOMY_ID_LANGUAGE = 'language';
		const languageCompetenciesFormatted: Array<CompetenceLinguistique> = [];

		const listPositionsCompetencies = this.transformElementToArray(positionsCompetencies);

		listPositionsCompetencies.map((positionCompetency) => {
			const taxonomyID = this.xmlService.getTextValue(positionCompetency.TaxonomyID);
			if (taxonomyID.toLowerCase() !== TAXONOMY_ID_LANGUAGE) return;

			const compentencyId = this.xmlService.getTextValue(positionCompetency.CompetencyID).toLowerCase();
			const languageName = findLanguageNameCompetency(compentencyId);
			if (!languageName) return;

			const scoreText = positionCompetency.RequiredProficiencyLevel?.ScoreText && this.xmlService.getTextValue(positionCompetency.RequiredProficiencyLevel.ScoreText);
			const languageLevel = findLanguageLevel(scoreText);
			if (!languageLevel) return;

			const languageCompetenciesDetails = this.getSpecificationCompetencyLanguage(positionCompetency.CompetencyDimension);

			languageCompetenciesFormatted.push({
				codeDuNiveauDeLangue: languageLevel.valeur,
				detailCompetenceLanguistique: languageCompetenciesDetails,
				langage: languageName,
				nomDuNiveauDeLangue: languageLevel.libellé,
			});
		});

		return languageCompetenciesFormatted;
	}

	private getSpecificationCompetencyLanguage(competencyDimension?: Array<CompetencyDimension> | CompetencyDimension): Array<LanguageSpecificationCompetence> {
		function findCompetencyName(competencyDimension: string) {
			return langageCompetenceName.find((competency) => competency.codeValue === competencyDimension.toLowerCase())?.codeDescription;
		}

		function findCompetencyLevel(levelCode: LEVEL_CODE) {
			return niveauLangage.find((niveau) => niveau.valeur === levelCode);
		}

		if (!competencyDimension) return [];

		const competencies = this.transformElementToArray(competencyDimension);
		const languageCompetenciesDetails: Array<LanguageSpecificationCompetence> = [];

		competencies?.map((competencyDimension) => {
			const scoreText = this.xmlService.getTextValue(competencyDimension.Score.ScoreText);
			const competencyLevel = findCompetencyLevel(scoreText);

			const competencyDimensionText = this.xmlService.getTextValue(competencyDimension.CompetencyDimensionTypeCode);
			const competencyName = findCompetencyName(competencyDimensionText);

			if (competencyLevel && competencyName) {
				languageCompetenciesDetails.push({
					codeDuNiveauDeLaCompetence: competencyLevel.valeur,
					nomCompetence: competencyName,
					nomDuNiveauDeLaCompetence: competencyLevel.libellé,
				});
			}
		});
		return languageCompetenciesDetails;
	}

	private getExperienceNecessaire(positionQualifications?: PositionQualifications) {
		const experienceSummary = this.getElementOrFirstElementInArray(positionQualifications?.ExperienceSummary);

		if (!Array.isArray(experienceSummary?.ExperienceCategory)) {
			const experienceCategory = experienceSummary?.ExperienceCategory;
			return this.extractExperienceNecessaireWithinCategory(experienceCategory?.Measure);
		}

		const allDureesExperienceNecessaires = experienceSummary?.ExperienceCategory
			.map((experienceCategory) => {
				return this.extractExperienceNecessaireWithinCategory(experienceCategory.Measure);
			})
			.filter((dureeExperienceNecessaire): dureeExperienceNecessaire is ExperienceNecessaire => !!dureeExperienceNecessaire);

		const sortedDureesExperiencesNecessaires = allDureesExperienceNecessaires.sort(this.sortByNumberOfDays);

		if (sortedDureesExperiencesNecessaires.length === 0) {
			return undefined;
		}
		return sortedDureesExperiencesNecessaires[sortedDureesExperiencesNecessaires.length-1];
	}

	private extractExperienceNecessaireWithinCategory(experienceCategoryMeasure: ExperienceCategory['Measure'] | undefined): ExperienceNecessaire | undefined {
		const measureOfExperienceCategory = this.getElementOrFirstElementInArray(experienceCategoryMeasure);
		if (!measureOfExperienceCategory)
			return undefined;

		const duree = this.xmlService.getTextValue(measureOfExperienceCategory);
		const unitCode = measureOfExperienceCategory.attributs?.unitCode;

		return {
			duree,
			unite: unitCode,
		};
	}

	private sortByNumberOfDays(experience1: ExperienceNecessaire, experience2: ExperienceNecessaire) {
		function calculateNumberOfDays(experience: ExperienceNecessaire) {
			const NUMBER_OF_DAYS_IN_YEAR = 365;
			const NUMBER_OF_DAYS_IN_MONTH = 30;
			const NUMBER_OF_DAYS_IN_WEEK = 7;
			switch (experience.unite) {
				case UNITE_EXPERIENCE_NECESSAIRE.YEAR:
					return experience.duree * NUMBER_OF_DAYS_IN_YEAR;
				case UNITE_EXPERIENCE_NECESSAIRE.MONTH:
					return experience.duree * NUMBER_OF_DAYS_IN_MONTH;
				case UNITE_EXPERIENCE_NECESSAIRE.WEEK:
					return experience.duree * NUMBER_OF_DAYS_IN_WEEK;
				case UNITE_EXPERIENCE_NECESSAIRE.DAY:
					return experience.duree;
				default:
					return 0;
			}
		}

		const durationInDays1 = calculateNumberOfDays(experience1);
		const durationInDays2 = calculateNumberOfDays(experience2);

		return durationInDays1 - durationInDays2;
	}

	private getListePermisDeConduire(positionQualifications?: PositionQualifications) {
		const listDrivingLicense = this.transformElementToArray(positionQualifications?.LicenseTypeCode);
		return listDrivingLicense.map((drivingLicense) => this.xmlService.getTextValue(drivingLicense));
	}

	private getElementOrFirstElementInArray<T>(element?: T | Array<T>): T | undefined {
		if (element === undefined) {
			return undefined;
		}
		if (Array.isArray(element)) {
			return element[0];
		}
		return element;
	}

	private transformElementToArray<T>(element?: T | Array<T>): Array<T> {
		if (element === undefined) {
			return [];
		}

		if (Array.isArray(element)) {
			return element;
		}

		return [element];
	}
}
