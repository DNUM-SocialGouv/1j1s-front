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

export interface ApiEuresEmploiEuropeDetailResponse {
	data: {
		items: Array<{
			jobVacancy: {
				header: {
					handle: string;
				},
				hrxml: string;
			}
		}>
	}
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

namespace ApiEuresEmploiEuropeDetailXML {
	export interface OrganizationIdentifiers {
		OrganizationName?: string;
	}
	export interface PositionOrganization {
		OrganizationIdentifiers?: OrganizationIdentifiers | Array<OrganizationIdentifiers>
	}
	export interface PositionProfile {
		PositionOrganization?: PositionOrganization | Array<PositionOrganization>
		PositionTitle?: string;
	}
	export interface PositionOpening {
		PositionProfile?: PositionProfile | Array<PositionProfile>
	}
}

export interface ApiEuresEmploiEuropeDetailXML {
	PositionOpening?: ApiEuresEmploiEuropeDetailXML.PositionOpening
		| Array<ApiEuresEmploiEuropeDetailXML.PositionOpening>
}
