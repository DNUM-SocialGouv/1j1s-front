import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { paysEuropeList } from '~/client/domain/pays';
import {
	CompetenceLinguistique,
	EmploiEurope,
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
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { EURES_CONTRACT_TYPE, typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';
import { XmlService } from '~/server/services/xml/xml.service';
import Competency = ApiEuresEmploiEuropeDetailXML.PositionCompetency;
import CompetencyDimension = ApiEuresEmploiEuropeDetailXML.CompetencyDimension;
import WorkingLanguageCode = ApiEuresEmploiEuropeDetailXML.WorkingLanguageCode;


export class ApiEuresEmploiEuropeMapper {
	constructor(
		private readonly xmlService: XmlService,
	) {
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

	private transformElementToArray<T>(element: T | Array<T> | undefined): Array<T> {
		if (element === undefined) {
			return [];
		}
		if (Array.isArray(element)) {
			return element;
		}
		return [element];
	}

	public mapRechercheEmploiEurope(reponseRecherche: ApiEuresEmploiEuropeRechercheResponse, reponseDetailRecherche: ApiEuresEmploiEuropeDetailResponse): ResultatRechercheEmploiEurope {
		return {
			nombreResultats: reponseRecherche.data.dataSetInfo.totalMatchingCount,
			offreList: reponseRecherche.data.items.map((item): EmploiEurope => {
				const handle = item.header.handle;
				return this.mapDetailOffre(handle, reponseDetailRecherche);
			}),
		};
	}

	public mapDetailOffre = (handle: string, responseDetail: ApiEuresEmploiEuropeDetailResponse): EmploiEurope => {
		const itemDetail = responseDetail.data.items
			.find((detail) => detail.jobVacancy.header.handle === handle);
		const itemDetailXML = itemDetail?.jobVacancy.hrxml;

		const itemDetailParsed = this.xmlService.parse<ApiEuresEmploiEuropeDetailXML>(itemDetailXML);

		const positionOpening = this.getElementOrFirstElementInArray(itemDetailParsed?.PositionOpening);
		const positionProfile = this.getElementOrFirstElementInArray(positionOpening?.PositionProfile);
		const positionOrganization = this.getElementOrFirstElementInArray(positionProfile?.PositionOrganization);
		const positionDescription = this.getElementOrFirstElementInArray(positionProfile?.PositionFormattedDescription);
		const positionQualifications = this.getElementOrFirstElementInArray(positionProfile?.PositionQualifications);
		const organizationIdentifiers = this.getElementOrFirstElementInArray(positionOrganization?.OrganizationIdentifiers);

		const workingLanguage = positionProfile?.WorkingLanguageCode ? this.mapWorkingLanguage(positionProfile?.WorkingLanguageCode) : [];

		const languageCodeOffer = positionProfile?.attributs?.languageCode;

		const positionLocation = this.getElementOrFirstElementInArray(positionProfile?.PositionLocation);
		const address = this.getElementOrFirstElementInArray(positionLocation?.Address);
		const addressCityName = address?.['ns2:CityName'];
		const countryCode = address?.CountryCode && this.xmlService.getTextValue(address.CountryCode);
		const country = countryCode ? paysEuropeList.find((pays) => pays.code === countryCode)?.libellé : undefined;

		const positionOfferingTypeCode = this.getElementOrFirstElementInArray(positionProfile?.PositionOfferingTypeCode);
		const positionOfferingTypeCodeText = positionOfferingTypeCode && this.xmlService.getTextValue(positionOfferingTypeCode);
		const contractType = positionOfferingTypeCodeText ? this.mapContractType(positionOfferingTypeCodeText) : undefined;

		const positionScheduleTypeCode = this.getElementOrFirstElementInArray(positionProfile?.PositionScheduleTypeCode);
		const positionScheduleTypeCodeText = positionScheduleTypeCode && this.xmlService.getTextValue(positionScheduleTypeCode);
		const tempsDeTravail = positionScheduleTypeCodeText ? this.mapTempsDeTravail(positionScheduleTypeCodeText) : undefined;

		const positionsCompetencies = positionQualifications?.PositionCompetency;
		const competencesLinguistiques = positionsCompetencies ? this.getLanguageCompetencies(positionsCompetencies) : [];

		const experienceSummary = this.getElementOrFirstElementInArray(positionQualifications?.ExperienceSummary);
		const experienceCategory = this.getElementOrFirstElementInArray(experienceSummary?.ExperienceCategory);
		const anneesDExperience = this.getElementOrFirstElementInArray(experienceCategory?.Measure);

		const listDrivingLicense = this.transformElementToArray(positionQualifications?.LicenseTypeCode);
		const listDrivingLicenseText = listDrivingLicense.map((drivingLicense) => this.xmlService.getTextValue(drivingLicense));

		const descriptionDetail = positionDescription?.Content;

		const educationRequirement = this.getElementOrFirstElementInArray(positionQualifications?.EducationRequirement);
		const educationLevelCode = this.getElementOrFirstElementInArray(educationRequirement?.EducationLevelCode);
		const educationLevelCodeText = educationLevelCode && this.xmlService.getTextValue(educationLevelCode);
		const niveauEtudes = this.mapNiveauEtudes(educationLevelCodeText);

		return {
			anneesDExperience: anneesDExperience !== undefined ? this.xmlService.getTextValue(anneesDExperience) : undefined,
			codeLangueDeLOffre: languageCodeOffer,
			competencesLinguistiques: competencesLinguistiques,
			description: descriptionDetail && this.xmlService.getTextValue(descriptionDetail),
			id: handle,
			langueDeTravail: workingLanguage,
			listePermis: listDrivingLicenseText,
			niveauEtudes,
			nomEntreprise: organizationIdentifiers?.OrganizationName && this.xmlService.getTextValue(organizationIdentifiers.OrganizationName),
			pays: country,
			tempsDeTravail,
			titre: positionProfile?.PositionTitle && this.xmlService.getTextValue(positionProfile.PositionTitle),
			typeContrat: contractType,
			urlCandidature: itemDetail?.related.urls[0].urlValue,
			ville: addressCityName && this.xmlService.getTextValue(addressCityName),
		};
	};

	private mapContractType(positionOfferingTypeCode: string) {
		if (positionOfferingTypeCode === EURES_CONTRACT_TYPE.NS)
			return undefined;
		return typesContratEures.find(
			(typeContratEures) => typeContratEures.valeur === positionOfferingTypeCode)?.libellé;
	}

	private mapTempsDeTravail(positionScheduleTypeCode: string) {
		return tempsDeTravailEures.find(
			(tempsDeTravail) => tempsDeTravail.valeur === positionScheduleTypeCode)?.libellé;
	}

	private mapNiveauEtudes(educationLevelCode?: number) {
		return niveauEtudesEures.find(
			(niveauEtudes) => niveauEtudes.valeur === educationLevelCode)?.libellé;
	}

	private mapWorkingLanguage(workingLanguageCode: WorkingLanguageCode | Array<WorkingLanguageCode>) {
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

	private getSpecificationCompetenceLanguage(competencyDimension: Array<CompetencyDimension> | CompetencyDimension): Array<LanguageSpecificationCompetence> {
		function findCompetencyName(competencyDimension: string) {
			return langageCompetenceName.find((competency) => competency.codeValue === competencyDimension.toLowerCase())?.codeDescription;
		}

		function findCompetencyLevel(levelCode: LEVEL_CODE) {
			return niveauLangage.find((niveau) => niveau.valeur === levelCode);
		}

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

	private getLanguageCompetencies(positionsCompetencies: Array<Competency> | Competency): Array<CompetenceLinguistique> {
		const TAXONOMY_ID_LANGUAGE = 'language';
		const languageCompetenciesFormatted: Array<CompetenceLinguistique> = [];

		const listPositionsCompetencies = this.transformElementToArray(positionsCompetencies);

		listPositionsCompetencies.map((positionCompetency) => {
			const taxonomyID = this.xmlService.getTextValue(positionCompetency.TaxonomyID);
			if (taxonomyID !== TAXONOMY_ID_LANGUAGE) return;

			const compentencyId = this.xmlService.getTextValue(positionCompetency.CompetencyID).toLowerCase();
			const languageName = langageParPaysEures.find((langage) => langage.codeValue === compentencyId)?.codeDescription;
			if (!languageName) return;

			const scoreText = positionCompetency.RequiredProficiencyLevel?.ScoreText && this.xmlService.getTextValue(positionCompetency.RequiredProficiencyLevel.ScoreText);
			const niveauRequis = niveauLangage.find((niveau) => niveau.valeur === scoreText);
			if (!niveauRequis) return;

			const languageCompetenciesDetails = positionCompetency.CompetencyDimension ? this.getSpecificationCompetenceLanguage(positionCompetency.CompetencyDimension) : [];

			languageCompetenciesFormatted.push({
				codeDuNiveauDeLangue: niveauRequis.valeur,
				detailCompetenceLanguistique: languageCompetenciesDetails,
				langage: languageName,
				nomDuNiveauDeLangue: niveauRequis.libellé,
			});
		});

		return languageCompetenciesFormatted;
	}
}
