import {
	MetierAlternance,
	MetierLaBonneAlternanceApiResponse
} from '../../domain/métier'


export const aMetierLaBonneAlternanceApiResponse = (): MetierLaBonneAlternanceApiResponse => {
	return {
		labelsAndRomes: [
			{ label: "Vente, transaction, gestion immobilière", romes: ["C1504", "C1501", "C1502", "C1503"] },
			{ label: "Transport aérien", romes: ["N2101", "N2102", "N2203", "N2204"]},
			{ label: "Transport ferroviaire", romes: ["N4301", "N4401", "N4403"]},
		]
	}
}

export const aListeDeMetierLaBonneAlternance = (): Array<MetierAlternance> => {
	return [
		{ label: "Vente, transaction, gestion immobilière", romes: ["C1504", "C1501", "C1502", "C1503"] },
		{ label: "Transport aérien", romes: ["N2101", "N2102", "N2203", "N2204"]},
		{ label: "Transport ferroviaire", romes: ["N4301", "N4401", "N4403"]},
	]
}
