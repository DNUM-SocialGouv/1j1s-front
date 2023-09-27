import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { ApiEuresEmploiEuropeRechercheResponse } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { mapRechercheEmploiEurope } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { createSuccess, Either } from '~/server/errors/either';

export class fixtureEmploiEuropeRepository implements EmploiEuropeRepository {
	async search(): Promise<Either<ResultatRechercheEmploiEurope>> {
		const response = aResultatRechercheApiEuresEmploiEurope();
		return createSuccess(mapRechercheEmploiEurope(response));
	}
}

export function aResultatRechercheApiEuresEmploiEurope(override?: Partial<ApiEuresEmploiEuropeRechercheResponse>): ApiEuresEmploiEuropeRechercheResponse {
	return {
		data: {
			dataSetInfo: {
				pageNumber: 1,
				resultsPerPage: 40,
				sortBy: 'BEST_MATCH',
				totalMatchingCount: 15,
				totalPageCount: 1,
			},
			items: [
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:13:28',
						modificationTimestamp: '2023-08-26T22:06:26',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e5-4a42-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTUtNGE0Mi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTUtNGE0Mi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:12:30',
						modificationTimestamp: '2023-08-26T22:06:26',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-efa3-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtZWZhMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtZWZhMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:59',
						modificationTimestamp: '2023-08-24T22:06:41',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ec-53af-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWMtNTNhZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWMtNTNhZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:11:59',
						modificationTimestamp: '2023-08-24T22:06:34',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-c7fd-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtYzdmZC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtYzdmZC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:11:57',
						modificationTimestamp: '2023-08-24T22:06:31',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-cac8-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtY2FjOC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtY2FjOC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:29:17',
						modificationTimestamp: '2023-08-23T22:07:12',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ea-ff89-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWEtZmY4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWEtZmY4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:11:54',
						modificationTimestamp: '2023-08-23T22:06:43',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-c4a2-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtYzRhMi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtYzRhMi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:12:11',
						modificationTimestamp: '2023-08-23T22:06:43',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-d4e5-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtZDRlNS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '67.79017',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtZDRlNS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:33:21',
						modificationTimestamp: '2023-08-25T22:06:25',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ec-8054-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWMtODA1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '31.530306',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWMtODA1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:11:34',
						modificationTimestamp: '2023-08-23T22:06:39',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-b270-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtYjI3MC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '26.184456',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtYjI3MC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:13:49',
						modificationTimestamp: '2023-08-27T22:07:13',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e5-760a-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTUtNzYwYS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '25.045244',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTUtNzYwYS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:16:25',
						modificationTimestamp: '2023-08-27T22:07:09',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e6-59cc-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTYtNTljYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '25.045244',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTYtNTljYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:40',
						modificationTimestamp: '2023-08-23T22:06:41',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ec-4e55-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWMtNGU1NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '25.045244',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWMtNGU1NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:13:27',
						modificationTimestamp: '2023-08-22T22:07:17',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e5-4565-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTUtNDU2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '25.045244',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTUtNDU2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:18:12',
						modificationTimestamp: '2023-08-22T22:07:17',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e6-eb10-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTYtZWIxMC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '25.045244',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTYtZWIxMC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=test_pe_wizbii',
							},
						],
					},
				},
			],
		},
		header: {
			parameters: {
				acceptLanguageHeader: 'fr',
				request: {
					dataSetRequest: {
						excludedDataSources: [
							{
								dataSourceId: 29,
							},
							{
								dataSourceId: 81,
							},
							{
								dataSourceId: 781,
							},
						],
						pageNumber: 1,
						resultsPerPage: 40,
						sortBy: 'BEST_MATCH',
					},
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'LOCATION',
								facetValues: [
									'NL',
								],
							},
							{
								facetName: 'EXPERIENCE',
								facetValues: [
									'A',
									'B',
								],
							},
							{
								facetName: 'POSITION_OFFERING',
								facetValues: [
									'apprenticeship',
									'contracttohire',
									'directhire',
									'seasonal',
									'selfemployed',
									'temporary',
								],
							},
						],
						keywordCriteria: {
							keywordLanguageCode: 'fr',
							keywords: [
								{
									keywordScope: 'EVERYWHERE',
									keywordText: 'Boulanger',
								},
								{
									keywordScope: 'EVERYWHERE',
									keywordText: 'Maçon',
								},
							],
						},
					},
				},
			},
		},
		...override,
	} as ApiEuresEmploiEuropeRechercheResponse;
}
