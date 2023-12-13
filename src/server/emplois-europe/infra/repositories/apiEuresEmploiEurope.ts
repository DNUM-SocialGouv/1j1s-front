import { LEVEL_CODE } from '~/server/emplois-europe/infra/langageEures';

export const NOMBRE_RESULTATS_EMPLOIS_EUROPE_PAR_PAGE = 15;

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

export namespace ApiEuresEmploiEuropeDetailXML {
	export interface OrganizationIdentifiers {
		OrganizationName?: string;
	}

	export interface PositionOrganization {
		OrganizationIdentifiers?: OrganizationIdentifiers | Array<OrganizationIdentifiers>
	}

	export interface Address {
		'ns2:CityName'?: string;
		CountryCode?: string;
	}

	export interface PositionLocation {
		Address?: Address | Array<Address>
	}

	export interface PositionProfile {
		PositionOrganization?: PositionOrganization | Array<PositionOrganization>
		PositionTitle?: string;
		PositionLocation?: PositionLocation | Array<PositionLocation>
		PositionOfferingTypeCode?: string
		WorkingLanguageCode?: string
		PositionFormattedDescription?: PositionFormattedDescription | Array<PositionFormattedDescription>
		PositionScheduleTypeCode?: string
		PositionQualifications?: PositionQualifications | Array<PositionQualifications>
	}


	export interface PositionQualifications {
		PositionCompetency: PositionCompetency | Array<PositionCompetency>
		LicenseTypeCode: string
		EducationRequirement?: EducationRequirement | Array<EducationRequirement>
		ExperienceSummary?: ExperienceSummary | Array<ExperienceSummary>
	}

	export interface PositionCompetency {
		TaxonomyID: string,
		CompetencyID: string,
		RequiredProficiencyLevel?: {
			ScoreText?: LEVEL_CODE
		}
		CompetencyDimension?: Array<CompetencyDimension> | CompetencyDimension
	}

	export interface CompetencyDimension {
		CompetencyDimensionTypeCode: string
		Score: {
			ScoreText: LEVEL_CODE
		}
	}

	export interface EducationRequirement {
		EducationLevelCode?: number;
	}

	export interface ExperienceSummary {
		ExperienceCategory?: ExperienceCategory | Array<ExperienceCategory>
	}

	interface ExperienceCategory{
		Measure: number | Array<number>
	}


	export interface PositionOpening {
		PositionProfile?: PositionProfile | Array<PositionProfile>
	}

	export interface PositionFormattedDescription {
		Content: string
	}
}

export interface ApiEuresEmploiEuropeDetailXML {
	PositionOpening?: ApiEuresEmploiEuropeDetailXML.PositionOpening
		| Array<ApiEuresEmploiEuropeDetailXML.PositionOpening>
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
			facetValues: Array<string>;
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
