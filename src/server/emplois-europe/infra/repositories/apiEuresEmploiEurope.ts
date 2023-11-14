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

namespace ApiEuresEmploiEuropeDetailXML {
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
	}

	export interface PositionOpening {
		PositionProfile?: PositionProfile | Array<PositionProfile>
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
