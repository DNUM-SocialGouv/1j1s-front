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
