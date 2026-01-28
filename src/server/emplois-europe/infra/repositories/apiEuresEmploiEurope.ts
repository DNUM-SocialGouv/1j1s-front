import { LEVEL_CODE } from '~/server/emplois-europe/infra/langageEures';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';

export const EMPLOIS_EUROPE_ITEMS_PER_PAGE = 15;
const EMPLOIS_EUROPE_MAX_VISIBLE_ITEMS = 10_000;
export const EMPLOIS_EUROPE_LAST_VISIBLE_PAGE_ALLOWED = Math.floor(EMPLOIS_EUROPE_MAX_VISIBLE_ITEMS / EMPLOIS_EUROPE_ITEMS_PER_PAGE);

export interface ApiEuresEmploiEuropeRechercheResponse {
	data: {
		dataSetInfo: {
			totalMatchingCount: number;
		}
		items: Array<{
			header: {
				handle: string;
			}
		}>
	}
}

export interface ApiEuresEmploiEuropeResponseJobVacancy {
	header: {
		handle: string;
	},
	hrxml: string;
}

export interface ApiEuresEmploiEuropeResponseRelated {
	urls: Array<{
		urlValue: string
	}>
}

export interface ApiEuresEmploiEuropeDetailResponse {
	data: {
		items: Array<ApiEuresEmploiEuropeDetailItem>
	}
}

export interface ApiEuresEmploiEuropeDetailItem {
	jobVacancy: ApiEuresEmploiEuropeResponseJobVacancy,
	related: ApiEuresEmploiEuropeResponseRelated
}

export interface ApiEuresEmploiEuropeDetailItem {
	jobVacancy: ApiEuresEmploiEuropeResponseJobVacancy,
	related: ApiEuresEmploiEuropeResponseRelated
}

export interface ApiEuresEmploiEuropeDetailXMLOrganizationIdentifiers {
	OrganizationName?: {
		'textContent': string
	};
}

export interface ApiEuresEmploiEuropeDetailXMLPositionOrganization {
	OrganizationIdentifiers?: ApiEuresEmploiEuropeDetailXMLOrganizationIdentifiers | Array<ApiEuresEmploiEuropeDetailXMLOrganizationIdentifiers>
}

export interface ApiEuresEmploiEuropeDetailXMLAddress {
	CityName?: {
		'textContent': string
	};
	CountryCode?: {
		'textContent': string
	};
}

export interface ApiEuresEmploiEuropeDetailXMLPositionLocation {
	Address?: ApiEuresEmploiEuropeDetailXMLAddress | Array<ApiEuresEmploiEuropeDetailXMLAddress>
}

export interface ApiEuresEmploiEuropeDetailXMLPositionProfile {
	PositionOrganization?: ApiEuresEmploiEuropeDetailXMLPositionOrganization | Array<ApiEuresEmploiEuropeDetailXMLPositionOrganization>
	PositionTitle?: {
		'textContent': string
	};
	PositionLocation?: ApiEuresEmploiEuropeDetailXMLPositionLocation | Array<ApiEuresEmploiEuropeDetailXMLPositionLocation>
	PositionOfferingTypeCode?: {
		'textContent': string
	};
	WorkingLanguageCode?: ApiEuresEmploiEuropeDetailXMLWorkingLanguageCode;
	PositionFormattedDescription?: ApiEuresEmploiEuropeDetailXMLPositionFormattedDescription | Array<ApiEuresEmploiEuropeDetailXMLPositionFormattedDescription>
	PositionScheduleTypeCode?: {
		'textContent': string
	};
	PositionQualifications?: ApiEuresEmploiEuropeDetailXMLPositionQualifications | Array<ApiEuresEmploiEuropeDetailXMLPositionQualifications>
	attributs?: {
		languageCode?: string
	}
}

export interface ApiEuresEmploiEuropeDetailXMLWorkingLanguageCode {
	'textContent': string
}

export interface ApiEuresEmploiEuropeDetailXMLPositionQualifications {
	PositionCompetency: ApiEuresEmploiEuropeDetailXMLPositionCompetency | Array<ApiEuresEmploiEuropeDetailXMLPositionCompetency>
	LicenseTypeCode: {
		'textContent': string
	};
	EducationRequirement?: ApiEuresEmploiEuropeDetailXMLEducationRequirement | Array<ApiEuresEmploiEuropeDetailXMLEducationRequirement>
	ExperienceSummary?: ApiEuresEmploiEuropeDetailXMLExperienceSummary | Array<ApiEuresEmploiEuropeDetailXMLExperienceSummary>
}

export interface ApiEuresEmploiEuropeDetailXMLPositionCompetency {
	TaxonomyID: {
		'textContent': string
	},
	CompetencyID: {
		'textContent': string
	},
	RequiredProficiencyLevel?: {
		ScoreText?: {
			'textContent': LEVEL_CODE
		},
	}
	CompetencyDimension?: Array<ApiEuresEmploiEuropeDetailXMLCompetencyDimension> | ApiEuresEmploiEuropeDetailXMLCompetencyDimension
}

export interface ApiEuresEmploiEuropeDetailXMLCompetencyDimension {
	CompetencyDimensionTypeCode: {
		'textContent': string
	}
	Score: {
		ScoreText: {
			'textContent': LEVEL_CODE
		}
	}
}

export enum ApiEuresEmploiEuropeDetailXMLNiveauEtudeAPIEures {
	ENSEIGNEMENT_PRESCOLAIRE = 0,
	ENSEIGNEMENT_PRIMAIRE = 1,
	ENSEIGNEMENT_SECONDAIRE_INFERIEUR = 2,
	ENSEIGNEMENT_SECONDAIRE_SUPERIEUR = 3,
	ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR = 4,
	ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT = 5,
	NIVEAU_LICENCE_OU_EQUIVALENT = 6,
	NIVEAU_MAITRISE_OU_EQUIVALENT = 7,
	NIVEAU_DOCTORAT_OU_EQUIVALENT = 8,
	NON_SPECIFIE = 'NS',
}

export interface ApiEuresEmploiEuropeDetailXMLEducationRequirement {
	EducationLevelCode?: {
		'textContent': ApiEuresEmploiEuropeDetailXMLNiveauEtudeAPIEures
	};
}

export interface ApiEuresEmploiEuropeDetailXMLExperienceSummary {
	ExperienceCategory?: ApiEuresEmploiEuropeDetailXMLExperienceCategory | Array<ApiEuresEmploiEuropeDetailXMLExperienceCategory>
}

export interface ApiEuresEmploiEuropeDetailXMLExperienceCategory {
	Measure: ApiEuresEmploiEuropeDetailXMLMeasure | Array<ApiEuresEmploiEuropeDetailXMLMeasure>
}

export interface ApiEuresEmploiEuropeDetailXMLMeasure {
	'textContent': number
	attributs?: {
		unitCode?: UNITE_EXPERIENCE_NECESSAIRE
	}
}


export interface ApiEuresEmploiEuropeDetailXMLPositionOpening {
	PositionProfile?: ApiEuresEmploiEuropeDetailXMLPositionProfile | Array<ApiEuresEmploiEuropeDetailXMLPositionProfile>
}


export interface ApiEuresEmploiEuropeDetailXMLPositionFormattedDescription {
	Content: {
		'textContent': string
	};
}

export interface ApiEuresEmploiEuropeDetailXML {
	PositionOpening?: ApiEuresEmploiEuropeDetailXMLPositionOpening
	| Array<ApiEuresEmploiEuropeDetailXMLPositionOpening>
}

export interface ApiEuresEmploiEuropeRechercheRequestBody {
	dataSetRequest: {
		excludedDataSources: Array<{ dataSourceId: number }>;
		pageNumber: string;
		resultsPerPage: string;
		sortBy: string;
	};
	searchCriteria: {
		facetCriteria?: Array<{
			facetName: string;
			facetValues: Array<string | number>;
		}>;
		keywordCriteria?: {
			keywordLanguageCode: string;
			keywords: Array<{
				keywordScope: string;
				keywordText: string;
			}>;
		};
	};
}
