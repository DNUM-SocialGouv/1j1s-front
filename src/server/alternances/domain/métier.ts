
export namespace MetierLaBonneAlternanceApiResponse {
	export interface LabelAndRomes {
		label: string
		romes: Array<string>
	}
}

export interface MetierLaBonneAlternanceApiResponse {
	labelsAndRomes: Array<MetierLaBonneAlternanceApiResponse.LabelAndRomes>
}



export interface MetierAlternance {
	label: string
	romes: Array<string>
}