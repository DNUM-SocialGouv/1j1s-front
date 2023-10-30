import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import {
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { createSuccess, Either } from '~/server/errors/either';

export class fixtureEmploiEuropeRepository implements EmploiEuropeRepository {
	constructor(
		private readonly apiEuresEmploiEuropeMapper: ApiEuresEmploiEuropeMapper,
	) {
	}
	async search(): Promise<Either<ResultatRechercheEmploiEurope>> {
		const response = aResultatRechercheApiEuresEmploiEurope();
		const responseDetail = aResultatRechercheDetailApiEuresEmploiEurope();
		return createSuccess(this.apiEuresEmploiEuropeMapper.mapRechercheEmploiEurope(response, responseDetail));
	}
}

export function aResultatRechercheApiEuresEmploiEurope(override?: Partial<ApiEuresEmploiEuropeRechercheResponse>): ApiEuresEmploiEuropeRechercheResponse {
	return {
		data: {
			dataSetInfo: {
				pageNumber: 1,
				resultsPerPage: 40,
				sortBy: 'BEST_MATCH',
				totalMatchingCount: 655,
				totalPageCount: 17,
			},
			items: [
				{
					auditInfo: {
						creationTimestamp: '2023-09-11T08:01:03',
						modificationTimestamp: '2023-10-11T07:29:52',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3978313',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk3ODMxMyA0NA',
					},
					jobRelevance: {
						relevanceScore: '238.05038',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk3ODMxMyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-27T13:00:09',
						modificationTimestamp: '2023-10-11T07:27:00',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4026258',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAyNjI1OCA0NA',
					},
					jobRelevance: {
						relevanceScore: '233.33104',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyNjI1OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-28T13:03:27',
						modificationTimestamp: '2023-10-11T06:50:13',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3912706',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'MzkxMjcwNiA0NA',
					},
					jobRelevance: {
						relevanceScore: '220.61523',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MzkxMjcwNiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-13T11:00:53',
						modificationTimestamp: '2023-10-11T07:27:05',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3984808',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk4NDgwOCA0NA',
					},
					jobRelevance: {
						relevanceScore: '209.3144',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4NDgwOCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-08T12:18:04',
						modificationTimestamp: '2023-10-11T07:26:14',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3973204',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk3MzIwNCA0NA',
					},
					jobRelevance: {
						relevanceScore: '168.78421',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk3MzIwNCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-21T10:00:19',
						modificationTimestamp: '2023-10-11T07:28:03',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4006598',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAwNjU5OCA0NA',
					},
					jobRelevance: {
						relevanceScore: '148.14897',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAwNjU5OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:27:13',
						modificationTimestamp: '2023-09-27T22:07:38',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ea-4d89-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWEtNGQ4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '120.39081',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWEtNGQ4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-29T13:00:16',
						modificationTimestamp: '2023-10-11T07:31:25',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4029892',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAyOTg5MiA0NA',
					},
					jobRelevance: {
						relevanceScore: '102.94264',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyOTg5MiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-20T10:00:11',
						modificationTimestamp: '2023-10-11T07:29:45',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4003880',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAwMzg4MCA0NA',
					},
					jobRelevance: {
						relevanceScore: '102.94264',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAwMzg4MCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-06T10:00:32',
						modificationTimestamp: '2023-10-11T07:26:46',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4045422',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDA0NTQyMiA0NA',
					},
					jobRelevance: {
						relevanceScore: '94.80121',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDA0NTQyMiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-26T13:00:06',
						modificationTimestamp: '2023-10-11T07:26:41',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4022377',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAyMjM3NyA0NA',
					},
					jobRelevance: {
						relevanceScore: '94.80121',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyMjM3NyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-06T10:00:16',
						modificationTimestamp: '2023-10-11T06:49:21',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4045388',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDA0NTM4OCA0NA',
					},
					jobRelevance: {
						relevanceScore: '94.80121',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDA0NTM4OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-06-07T07:50:55',
						modificationTimestamp: '2023-06-07T11:54:36',
					},
					header: {
						dataSourceId: 1143,
						dataSourceJvReference: '30449',
						dataSourceName: 'BE ADG',
						handle: 'MzA0NDkgMTE0Mw',
					},
					jobRelevance: {
						relevanceScore: '93.17245',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MzA0NDkgMTE0Mw?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T20:10:07',
						modificationTimestamp: '2023-10-11T07:29:54',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3983724',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk4MzcyNCA0NA',
					},
					jobRelevance: {
						relevanceScore: '91.19389',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyNCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T19:08:56',
						modificationTimestamp: '2023-10-11T07:28:08',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3983722',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk4MzcyMiA0NA',
					},
					jobRelevance: {
						relevanceScore: '91.19389',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyMiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T20:01:43',
						modificationTimestamp: '2023-10-11T07:28:04',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '3983723',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'Mzk4MzcyMyA0NA',
					},
					jobRelevance: {
						relevanceScore: '91.19389',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyMyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-02T07:00:19',
						modificationTimestamp: '2023-10-11T07:27:29',
					},
					header: {
						dataSourceId: 44,
						dataSourceJvReference: '4030669',
						dataSourceName: 'BE ACTIRIS CONF',
						handle: 'NDAzMDY2OSA0NA',
					},
					jobRelevance: {
						relevanceScore: '91.19389',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAzMDY2OSA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:18:42',
						modificationTimestamp: '2023-09-27T22:07:27',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e7-1711-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTctMTcxMS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '87.5808',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctMTcxMS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:03',
						modificationTimestamp: '2023-10-01T22:07:19',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00667b69-e057-72cc-e063-8e92b20a3572',
						dataSourceName: 'NL TEST',
						handle: 'MDA2NjdiNjktZTA1Ny03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTA1Ny03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:10',
						modificationTimestamp: '2023-10-01T22:07:16',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00667b69-e942-72cc-e063-8e92b20a3572',
						dataSourceName: 'NL TEST',
						handle: 'MDA2NjdiNjktZTk0Mi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTk0Mi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:09:56',
						modificationTimestamp: '2023-10-01T22:07:00',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00667b69-d712-72cc-e063-8e92b20a3572',
						dataSourceName: 'NL TEST',
						handle: 'MDA2NjdiNjktZDcxMi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZDcxMi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:14',
						modificationTimestamp: '2023-10-01T22:06:58',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00667b69-ef6f-72cc-e063-8e92b20a3572',
						dataSourceName: 'NL TEST',
						handle: 'MDA2NjdiNjktZWY2Zi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZWY2Zi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:05',
						modificationTimestamp: '2023-10-01T22:06:54',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00667b69-e263-72cc-e063-8e92b20a3572',
						dataSourceName: 'NL TEST',
						handle: 'MDA2NjdiNjktZTI2My03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTI2My03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:12:27',
						modificationTimestamp: '2023-10-01T22:06:39',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e4-ec54-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTQtZWM1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtZWM1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:33:14',
						modificationTimestamp: '2023-10-01T22:06:34',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50ec-69d7-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWMtNjlkNy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWMtNjlkNy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:29:35',
						modificationTimestamp: '2023-09-30T22:06:22',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-1075-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItMTA3NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItMTA3NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:01',
						modificationTimestamp: '2023-09-29T22:09:41',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-fc9f-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItZmM5Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZmM5Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:01',
						modificationTimestamp: '2023-09-29T22:09:41',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-9f98-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItOWY5OC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItOWY5OC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:18',
						modificationTimestamp: '2023-09-29T22:09:37',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-b497-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItYjQ5Ny02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjQ5Ny02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-12T22:09:28',
						modificationTimestamp: '2023-09-29T22:09:37',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00525d6f-24c5-9cc3-e063-8e92b20aff79',
						dataSourceName: 'NL TEST',
						handle: 'MDA1MjVkNmYtMjRjNS05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA1MjVkNmYtMjRjNS05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-04T22:11:50',
						modificationTimestamp: '2023-09-29T22:09:34',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ffb16eb3-f143-3f97-e053-8e92b20a6eda',
						dataSourceName: 'NL TEST',
						handle: 'ZmZiMTZlYjMtZjE0My0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmZiMTZlYjMtZjE0My0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:17',
						modificationTimestamp: '2023-09-29T22:09:33',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-b30f-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItYjMwZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjMwZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:21:00',
						modificationTimestamp: '2023-09-29T22:09:27',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e7-e32c-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTctZTMyYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctZTMyYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:03',
						modificationTimestamp: '2023-09-29T22:09:25',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-f665-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItZjY2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZjY2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-04T22:12:00',
						modificationTimestamp: '2023-09-29T22:09:12',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ffb16eb3-ff10-3f97-e053-8e92b20a6eda',
						dataSourceName: 'NL TEST',
						handle: 'ZmZiMTZlYjMtZmYxMC0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmZiMTZlYjMtZmYxMC0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:18',
						modificationTimestamp: '2023-09-29T22:09:05',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-b496-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItYjQ5Ni02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjQ5Ni02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:30:33',
						modificationTimestamp: '2023-09-29T22:09:04',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-69bf-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItNjliZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItNjliZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-12T22:09:21',
						modificationTimestamp: '2023-09-29T22:08:52',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: '00525d6f-1b37-9cc3-e063-8e92b20aff79',
						dataSourceName: 'NL TEST',
						handle: 'MDA1MjVkNmYtMWIzNy05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA1MjVkNmYtMWIzNy05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:00',
						modificationTimestamp: '2023-09-29T22:08:51',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50eb-fcd3-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZWItZmNkMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZmNkMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:21:02',
						modificationTimestamp: '2023-09-29T22:08:50',
					},
					header: {
						dataSourceId: 261,
						dataSourceJvReference: 'ff9d50e7-e48f-6f85-e053-8e92b20a8713',
						dataSourceName: 'NL TEST',
						handle: 'ZmY5ZDUwZTctZTQ4Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					},
					jobRelevance: {
						relevanceScore: '86.822174',
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctZTQ4Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
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
							],
						},
					},
				},
			},
		},
		...override,
	} as ApiEuresEmploiEuropeRechercheResponse;
}

export function anApiEuresEmploiEuropeRechercheDetailResponse(): ApiEuresEmploiEuropeDetailResponse {
	return {
		data: {
			items: [
				{
					jobVacancy: {
						header: {
							handle: '1',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Boulanger (H/F)', 'La Boulangerie'),
					},
				},
				{
					jobVacancy: {
						header: {
							handle: '2',
						},
						hrxml: '<PositionOpening></PositionOpening>',
					},
				},
			],
		},
	};
}

export function aResultatRechercheDetailXMLApiEuresEmploiEurope(titre?: string, nomEntreprise?: string, pays?: string, ville?: string): string {
	return `
		<PositionOpening xmlns="http://www.hr-xml.org/3" xmlns:ns2="http://www.url.com" majorVersionID="3" minorVersionID="2">
    <DocumentID
            schemeVersionID="1.3">DOCUMENT_ID
    </DocumentID>
    <AlternateDocumentID>
        ALTERNATE_DOCUMENT_ID
    </AlternateDocumentID>
    <PositionOpeningStatusCode name="Active">
        Active
    </PositionOpeningStatusCode>
    <PostingRequester agencyRoleCode="Requester">
        <PartyID>NL001</PartyID>
        <PartyName>ABC</PartyName>
    </PostingRequester>
    <PositionProfile languageCode="nl">
        <PostingInstruction>
            <PostingOptionCode>EURESFlag</PostingOptionCode>
            <ApplicationMethod>
                <Instructions>CV with attached letter,Letter,Telephone</Instructions>
                <PersonContact>
                    <PersonName>
                        <ns2:GivenName></ns2:GivenName>
                        <FamilyName
                                prefix=" ">Jean BONOT
                        </FamilyName>
                    </PersonName>
                    <Communication>
                        <ChannelCode>
                            Email
                        </ChannelCode>
                        <ns2:URI>info@email.com</ns2:URI>
                    </Communication>
                    <Communication>
                        <ChannelCode>Telephone</ChannelCode>
                        <ns2:DialNumber>
                            0102030405
                        </ns2:DialNumber>
                    </Communication>
                    <Communication>
                        <Address>
                            <ns2:BuildingNumber>123</ns2:BuildingNumber>
                            <ns2:StreetName>
                                Rue Victor Hugo
                            </ns2:StreetName>
                            <ns2:CityName>Paris</ns2:CityName>
                            <ns2:CountrySubDivisionCode>
                                75011
                            </ns2:CountrySubDivisionCode>
                            <CountryCode>
                            		NL
														</CountryCode>
                            <ns2:PostalCode>75001</ns2:PostalCode>
                        </Address>
                    </Communication>
                </PersonContact>
            </ApplicationMethod>
        </PostingInstruction>
        ${titre ? `<PositionTitle>${titre}</PositionTitle>` : ''}
        <PositionLocation>
            <Address currentAddressIndicator="true">
                ${ville ? `<ns2:CityName>${ville}</ns2:CityName>` : ''}
                <ns2:CountrySubDivisionCode>
                    75011
                </ns2:CountrySubDivisionCode>
                ${pays ? `<CountryCode>${pays}</CountryCode>` : ''}
                <ns2:PostalCode>75001</ns2:PostalCode>
            </Address>
        </PositionLocation>
        <PositionOrganization>
            <OrganizationIdentifiers>
                ${nomEntreprise ? `<OrganizationName>${nomEntreprise}</OrganizationName>` : ''}
                <OrganizationLegalID>
                    12345
                </OrganizationLegalID>
            </OrganizationIdentifiers>
            <OrganizationSizeCode>microenterprise</OrganizationSizeCode>
        </PositionOrganization>
        <PositionOpenQuantity>1</PositionOpenQuantity>
        <JobCategoryCode listName="ESCO_Occupations"
                         listURI="https://ec.europa.eu/esco/portal"
                         listVersionID="ESCOv1">
            http://data.europa.eu/esco/occupation/uuid
        </JobCategoryCode>
        <PositionOfferingTypeCode>
            DirectHire
        </PositionOfferingTypeCode>
        <PositionQualifications>
            <PositionCompetency>
                <CompetencyID schemeID="ESCO_Skills" schemeVersionID="ESCOv1">
                    http://data.europa.eu/esco/skill/uuid-2
                </CompetencyID>
                <TaxonomyID>other</TaxonomyID>
                <RequiredProficiencyLevel>
                    <ScoreText maximumScoreText="C2" minimumScoreText="A1">
                        B2
                    </ScoreText>
                </RequiredProficiencyLevel>
            </PositionCompetency>
            <PositionCompetency>
                <CompetencyID schemeID="ESCO_Skills" schemeVersionID="ESCOv1">
                    http://data.europa.eu/esco/skill/uuid-3
                </CompetencyID>
                <TaxonomyID>other</TaxonomyID>
                <RequiredProficiencyLevel>
                    <ScoreText maximumScoreText="C2" minimumScoreText="A1">
                        A2
                    </ScoreText>
                </RequiredProficiencyLevel>
            </PositionCompetency>
            <ExperienceSummary>
                <ExperienceCategory>
                    <CategoryCode listName="ESCO_Occupations"
                                  listURI="https://ec.europa.eu/esco/portal"
                                  listVersionID="ESCOv1">
                        http://data.europa.eu/esco/occupation/uuid-4
                    </CategoryCode>
                    <Measure
                            unitCode="month">12
                    </Measure>
                    <ns2:Description>Description de l offre d
                        emploi
                    </ns2:Description>
                </ExperienceCategory>
            </ExperienceSummary>
        </PositionQualifications>
        <PositionFormattedDescription>
            <Content>Contenu de l offre</Content>
        </PositionFormattedDescription>
        <TravelPreference>
            <ns2:Description>UNKNOWN</ns2:Description>
        </TravelPreference>
        <WorkingLanguageCode>nl</WorkingLanguageCode>
        <ImmediateStartIndicator>
            false
        </ImmediateStartIndicator>
        <PositionScheduleTypeCode>FullTime</PositionScheduleTypeCode>
        <OfferedRemunerationPackage>
            <RemunerationRange>
                <RemunerationTypeCode>BasePay</RemunerationTypeCode>
            </RemunerationRange>
            <ns2:Description type="RemunerationBasisCodeContentType"/>
        </OfferedRemunerationPackage>
        <ApplicationCloseDate>2023-10-15</ApplicationCloseDate>
    </PositionProfile>
</PositionOpening>
	`;
}

export function aResultatRechercheDetailApiEuresEmploiEurope(override?: Partial<ApiEuresEmploiEuropeDetailResponse>): ApiEuresEmploiEuropeDetailResponse {
	return {
		data: {
			items: [
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:33:14',
						modificationTimestamp: '2023-10-01T22:06:34',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50ec-69d7-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWMtNjlkNy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWMtNjlkNy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-11T08:01:03',
						modificationTimestamp: '2023-10-11T07:29:52',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3978313',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk3ODMxMyA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope(undefined, 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk3ODMxMyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:21:02',
						modificationTimestamp: '2023-09-29T22:08:50',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50e7-e48f-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZTctZTQ4Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctZTQ4Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-26T13:00:06',
						modificationTimestamp: '2023-10-11T07:26:41',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4022377',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAyMjM3NyA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyMjM3NyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:18',
						modificationTimestamp: '2023-09-29T22:09:05',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-b496-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItYjQ5Ni02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjQ5Ni02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:21:00',
						modificationTimestamp: '2023-09-29T22:09:27',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50e7-e32c-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZTctZTMyYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctZTMyYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:29:35',
						modificationTimestamp: '2023-09-30T22:06:22',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-1075-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItMTA3NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItMTA3NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-04T22:12:00',
						modificationTimestamp: '2023-09-29T22:09:12',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ffb16eb3-ff10-3f97-e053-8e92b20a6eda',
							dataSourceName: 'NL TEST',
							handle: 'ZmZiMTZlYjMtZmYxMC0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmZiMTZlYjMtZmYxMC0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-08T12:18:04',
						modificationTimestamp: '2023-10-11T07:26:14',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3973204',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk3MzIwNCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk3MzIwNCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:17',
						modificationTimestamp: '2023-09-29T22:09:33',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-b30f-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItYjMwZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjMwZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:18',
						modificationTimestamp: '2023-09-29T22:09:37',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-b497-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItYjQ5Ny02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItYjQ5Ny02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-20T10:00:11',
						modificationTimestamp: '2023-10-11T07:29:45',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4003880',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAwMzg4MCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAwMzg4MCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-13T11:00:53',
						modificationTimestamp: '2023-10-11T07:27:05',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3984808',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk4NDgwOCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4NDgwOCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:18:42',
						modificationTimestamp: '2023-09-27T22:07:27',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50e7-1711-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZTctMTcxMS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTctMTcxMS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:14',
						modificationTimestamp: '2023-10-01T22:06:58',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00667b69-ef6f-72cc-e063-8e92b20a3572',
							dataSourceName: 'NL TEST',
							handle: 'MDA2NjdiNjktZWY2Zi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZWY2Zi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-29T13:00:16',
						modificationTimestamp: '2023-10-11T07:31:25',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4029892',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAyOTg5MiA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyOTg5MiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-06T10:00:32',
						modificationTimestamp: '2023-10-11T07:26:46',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4045422',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDA0NTQyMiA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDA0NTQyMiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-12T22:09:28',
						modificationTimestamp: '2023-09-29T22:09:37',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00525d6f-24c5-9cc3-e063-8e92b20aff79',
							dataSourceName: 'NL TEST',
							handle: 'MDA1MjVkNmYtMjRjNS05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA1MjVkNmYtMjRjNS05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:03',
						modificationTimestamp: '2023-10-01T22:07:19',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00667b69-e057-72cc-e063-8e92b20a3572',
							dataSourceName: 'NL TEST',
							handle: 'MDA2NjdiNjktZTA1Ny03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTA1Ny03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-12T22:09:21',
						modificationTimestamp: '2023-09-29T22:08:52',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00525d6f-1b37-9cc3-e063-8e92b20aff79',
							dataSourceName: 'NL TEST',
							handle: 'MDA1MjVkNmYtMWIzNy05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA1MjVkNmYtMWIzNy05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T20:01:43',
						modificationTimestamp: '2023-10-11T07:28:04',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3983723',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk4MzcyMyA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyMyA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-06T10:00:16',
						modificationTimestamp: '2023-10-11T06:49:21',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4045388',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDA0NTM4OCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDA0NTM4OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-27T13:00:09',
						modificationTimestamp: '2023-10-11T07:27:00',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4026258',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAyNjI1OCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAyNjI1OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:09:56',
						modificationTimestamp: '2023-10-01T22:07:00',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00667b69-d712-72cc-e063-8e92b20a3572',
							dataSourceName: 'NL TEST',
							handle: 'MDA2NjdiNjktZDcxMi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZDcxMi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-28T13:03:27',
						modificationTimestamp: '2023-10-11T06:50:13',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3912706',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'MzkxMjcwNiA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MzkxMjcwNiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:03',
						modificationTimestamp: '2023-09-29T22:09:25',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-f665-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItZjY2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZjY2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:05',
						modificationTimestamp: '2023-10-01T22:06:54',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00667b69-e263-72cc-e063-8e92b20a3572',
							dataSourceName: 'NL TEST',
							handle: 'MDA2NjdiNjktZTI2My03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTI2My03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:31:01',
						modificationTimestamp: '2023-09-29T22:09:41',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-9f98-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItOWY5OC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItOWY5OC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T20:10:07',
						modificationTimestamp: '2023-10-11T07:29:54',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3983724',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk4MzcyNCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyNCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:27:13',
						modificationTimestamp: '2023-09-27T22:07:38',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50ea-4d89-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWEtNGQ4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWEtNGQ4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:01',
						modificationTimestamp: '2023-09-29T22:09:41',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-fc9f-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItZmM5Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZmM5Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-04T22:11:50',
						modificationTimestamp: '2023-09-29T22:09:34',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ffb16eb3-f143-3f97-e053-8e92b20a6eda',
							dataSourceName: 'NL TEST',
							handle: 'ZmZiMTZlYjMtZjE0My0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmZiMTZlYjMtZjE0My0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-21T10:00:19',
						modificationTimestamp: '2023-10-11T07:28:03',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4006598',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAwNjU5OCA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAwNjU5OCA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-09-12T19:08:56',
						modificationTimestamp: '2023-10-11T07:28:08',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '3983722',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'Mzk4MzcyMiA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/Mzk4MzcyMiA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-10-02T07:00:19',
						modificationTimestamp: '2023-10-11T07:27:29',
					},
					jobVacancy: {
						header: {
							dataSourceId: 44,
							dataSourceJvReference: '4030669',
							dataSourceName: 'BE ACTIRIS CONF',
							handle: 'NDAzMDY2OSA0NA',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/NDAzMDY2OSA0NA?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-13T22:10:10',
						modificationTimestamp: '2023-10-01T22:07:16',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: '00667b69-e942-72cc-e063-8e92b20a3572',
							dataSourceName: 'NL TEST',
							handle: 'MDA2NjdiNjktZTk0Mi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MDA2NjdiNjktZTk0Mi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:30:33',
						modificationTimestamp: '2023-09-29T22:09:04',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-69bf-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItNjliZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItNjliZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:12:27',
						modificationTimestamp: '2023-10-01T22:06:39',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50e4-ec54-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZTQtZWM1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZTQtZWM1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-07-03T22:32:00',
						modificationTimestamp: '2023-09-29T22:08:51',
					},
					jobVacancy: {
						header: {
							dataSourceId: 261,
							dataSourceJvReference: 'ff9d50eb-fcd3-6f85-e053-8e92b20a8713',
							dataSourceName: 'NL TEST',
							handle: 'ZmY5ZDUwZWItZmNkMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/ZmY5ZDUwZWItZmNkMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ?lang=fr&isScoped=true&referrer=pe_test_1j1s',
							},
						],
					},
				},
				{
					auditInfo: {
						creationTimestamp: '2023-06-07T07:50:55',
						modificationTimestamp: '2023-06-07T11:54:36',
					},
					jobVacancy: {
						header: {
							dataSourceId: 1143,
							dataSourceJvReference: '30449',
							dataSourceName: 'BE ADG',
							handle: 'MzA0NDkgMTE0Mw',
						},
						hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Nom Offre', 'Nom Entreprise'),
					},
					related: {
						urls: [
							{
								urlName: 'EURES portal',
								urlValue: 'https://webgate.acceptance.ec.europa.eu/eures/portal/jv-se/jv-details/MzA0NDkgMTE0Mw?lang=fr&isScoped=true&referrer=pe_test_1j1s',
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
					handle: [
						'Mzk3ODMxMyA0NA',
						'NDAyNjI1OCA0NA',
						'MzkxMjcwNiA0NA',
						'Mzk4NDgwOCA0NA',
						'Mzk3MzIwNCA0NA',
						'NDAwNjU5OCA0NA',
						'ZmY5ZDUwZWEtNGQ4OS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'NDAyOTg5MiA0NA',
						'NDAwMzg4MCA0NA',
						'NDA0NTQyMiA0NA',
						'NDAyMjM3NyA0NA',
						'NDA0NTM4OCA0NA',
						'MzA0NDkgMTE0Mw',
						'Mzk4MzcyNCA0NA',
						'Mzk4MzcyMiA0NA',
						'Mzk4MzcyMyA0NA',
						'NDAzMDY2OSA0NA',
						'ZmY5ZDUwZTctMTcxMS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'MDA2NjdiNjktZTA1Ny03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						'MDA2NjdiNjktZTk0Mi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						'MDA2NjdiNjktZDcxMi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						'MDA2NjdiNjktZWY2Zi03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						'MDA2NjdiNjktZTI2My03MmNjLWUwNjMtOGU5MmIyMGEzNTcyIDI2MQ',
						'ZmY5ZDUwZTQtZWM1NC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWMtNjlkNy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItMTA3NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItZmM5Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItOWY5OC02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItYjQ5Ny02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'MDA1MjVkNmYtMjRjNS05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
						'ZmZiMTZlYjMtZjE0My0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
						'ZmY5ZDUwZWItYjMwZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZTctZTMyYy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItZjY2NS02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmZiMTZlYjMtZmYxMC0zZjk3LWUwNTMtOGU5MmIyMGE2ZWRhIDI2MQ',
						'ZmY5ZDUwZWItYjQ5Ni02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZWItNjliZi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'MDA1MjVkNmYtMWIzNy05Y2MzLWUwNjMtOGU5MmIyMGFmZjc5IDI2MQ',
						'ZmY5ZDUwZWItZmNkMy02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
						'ZmY5ZDUwZTctZTQ4Zi02Zjg1LWUwNTMtOGU5MmIyMGE4NzEzIDI2MQ',
					],
					view: 'FULL_NO_ATTACHMENT',
				},
			},
		},
		...override,
	} as ApiEuresEmploiEuropeDetailResponse;
}
