import { RésultatsRechercheMissionEngagementResponse } from './apiEngagement.response';

export function aResultatsRechercheMissionEngagementResponse(override?: Partial<RésultatsRechercheMissionEngagementResponse>): RésultatsRechercheMissionEngagementResponse {
	return {
		hits: [
			{
				associationName: 'associationName',
				city: 'Nantes',
				clientId: 'clientId',
				description: 'description',
				id: 'id',
				openToMinors: 'yes',
				organizationLogo: 'http://organizationLogo.com/image.png',
				organizationName: 'organizationName',
				postalCode: '44000',
				publisherId: 'publisherId',
				publisherLogo: 'http://publisherLogo.com/image.png',
				startAt: '2021-12-01T00:00:00.000Z',
				title: 'title',
			},
			{
				associationName: undefined,
				city: undefined,
				clientId: 'clientId2',
				description: 'description2',
				id: undefined,
				openToMinors: 'no',
				organizationLogo: undefined,
				organizationName: 'organizationName2',
				postalCode: undefined,
				publisherId: 'publisherId2',
				publisherLogo: 'http://publisherLogo.com/image2.png',
				startAt: undefined,
				title: 'title2',
			},
		],
		total: 2,
		...override,
	};
}
