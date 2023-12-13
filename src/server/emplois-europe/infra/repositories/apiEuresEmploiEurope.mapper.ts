import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { paysEuropeList } from '~/client/domain/pays';
import {
	CompetenceLinguistique,
	EmploiEurope,
	LanguageSpecificationCompetence,
	ResultatRechercheEmploiEurope,
} from '~/server/emplois-europe/domain/emploiEurope';
import { langageParPaysEures, niveauLangage } from '~/server/emplois-europe/infra/langageEures';
import {
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { EURES_CONTRACT_TYPE, typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';
import { XmlService } from '~/server/services/xml/xml.service';
import Competency = ApiEuresEmploiEuropeDetailXML.PositionCompetency;
import CompetencyDimension = ApiEuresEmploiEuropeDetailXML.CompetencyDimension;

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

	mapRechercheEmploiEurope(reponseRecherche: ApiEuresEmploiEuropeRechercheResponse, reponseDetailRecherche: ApiEuresEmploiEuropeDetailResponse): ResultatRechercheEmploiEurope {
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

		const positionLocation = this.getElementOrFirstElementInArray(positionProfile?.PositionLocation);
		const address = this.getElementOrFirstElementInArray(positionLocation?.Address);
		const addressCityName = address?.['ns2:CityName'];
		const countryCode = address?.CountryCode;
		const country = countryCode ? paysEuropeList.find((pays) => pays.code === countryCode)?.libellé : undefined;

		const positionOfferingTypeCode = this.getElementOrFirstElementInArray<string>(positionProfile?.PositionOfferingTypeCode);
		const contractType = positionOfferingTypeCode ? this.mapContractType(positionOfferingTypeCode) : undefined;

		const positionScheduleTypeCode = this.getElementOrFirstElementInArray<string>(positionProfile?.PositionScheduleTypeCode);
		const tempsDeTravail = positionScheduleTypeCode ? this.mapTempsDeTravail(positionScheduleTypeCode) : undefined;

		const positionsCompetencies = positionQualifications?.PositionCompetency;
		const competencesLinguistiques = positionsCompetencies ? this.getLanguageCompetencies(positionsCompetencies) : [];

		const listDrivingLicense = this.transformElementToArray<string>(positionQualifications?.LicenseTypeCode);

		const descriptionDetail = positionDescription?.Content;

		const educationRequirement = this.getElementOrFirstElementInArray(positionQualifications?.EducationRequirement);
		const educationLevelCode = this.getElementOrFirstElementInArray(educationRequirement?.EducationLevelCode);
		const niveauEtudes = this.mapNiveauEtudes(educationLevelCode);

		return {
			competencesLinguistiques: competencesLinguistiques,
			description: descriptionDetail,
			id: handle,
			langueDeTravail: workingLanguage,
			listePermis: listDrivingLicense,
			niveauEtudes,
			nomEntreprise: organizationIdentifiers?.OrganizationName,
			pays: country,
			tempsDeTravail,
			titre: positionProfile?.PositionTitle,
			typeContrat: contractType,
			urlCandidature: itemDetail?.related.urls[0].urlValue,
			ville: addressCityName,
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

	private mapWorkingLanguage(workingLanguageCode: string | Array<string>) {
		const listWorkingLanguageName: Array<string> = [];
		const listWorkingLanguage = this.transformElementToArray<string>(workingLanguageCode);

		function findWorkingLanguageName(workingLanguageCode: string) {
			return langageParPaysEures.find(
				(langage) => langage.codeValue === workingLanguageCode.toLowerCase(),
			)?.codeDescription;
		}

		listWorkingLanguage.map((workingLanguage) => {
			const workingLanguageName = findWorkingLanguageName(workingLanguage);
			if (workingLanguageName) listWorkingLanguageName.push(workingLanguageName);
		});

		return listWorkingLanguageName;
	}

	private getSpecificationCompetenceLanguage(competencyDimension: Array<CompetencyDimension> | CompetencyDimension): Array<LanguageSpecificationCompetence> {
		const competencies = this.transformElementToArray(competencyDimension);
		const languageCompetenciesDetails: Array<LanguageSpecificationCompetence> = [];

		competencies?.map((competencyDimension) => {
			const niveauRequis = niveauLangage.find((niveau) => niveau.valeur === competencyDimension.Score.ScoreText);
			if (niveauRequis) {
				languageCompetenciesDetails.push({
					codeDuNiveauDeLaCompetence: niveauRequis.valeur,
					nomCompetence: competencyDimension.CompetencyDimensionTypeCode,
					nomDuNiveauDeLaCompetence: niveauRequis.libellé,
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
			if (positionCompetency.TaxonomyID !== TAXONOMY_ID_LANGUAGE) return;

			const languageName = langageParPaysEures.find((langage) => langage.codeValue === positionCompetency.CompetencyID.toLowerCase())?.codeDescription;
			if (!languageName) return;

			const scoreText = positionCompetency.RequiredProficiencyLevel?.ScoreText;
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
