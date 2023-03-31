import { AxiosResponse } from 'axios';

import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

export function aRechercheAdresseResponse(): AxiosResponse {
	return anAxiosResponse({
		features: [
			{
				geometry: {
					coordinates: [2.493832, 48.926541],
					type: 'Point',
				},
				properties: {
					city: 'Aulnay-sous-Bois',
					citycode: '93005',
					context: '93, Seine-Saint-Denis, Île-de-France',
					housenumber: '20',
					id: '93005_1880_00020',
					importance: 0.72961,
					label: '20 Avenue Jules Jouy Aulnay-sous-Bois',
					name: '20 Avenue Jules Jouy',
					postcode: '93600',
					score: 0.4948996103896104,
					street: 'Avenue Jules Jouy',
					type: 'housenumber',
					x: 662910.67,
					y: 6869736.5,
				},
				type: 'Feature',
			},
			{
				geometry: {
					coordinates: [1.553914, 48.510887],
					type: 'Point',
				},
				properties: {
					city: 'Jouy',
					citycode: '28201',
					context: '28, Eure-et-Loir, Centre-Val de Loire',
					housenumber: '20',
					id: '28201_0080_00020',
					importance: 0.51109,
					label: '20 Avenue de la Gare Jouy',
					name: '20 Avenue de la Gare',
					postcode: '28300',
					score: 0.3926165734265734,
					street: 'Avenue de la Gare',
					type: 'housenumber',
					x: 593197.33,
					y: 6824382.47,
				},
				type: 'Feature',
			},
		],
		type: 'FeatureCollection',
		version: 'draft',
	});
}
