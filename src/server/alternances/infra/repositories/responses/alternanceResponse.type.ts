import { MatchasResponse, MatchasResultResponse } from '~/server/alternances/infra/repositories/responses/matchasResponse.type';
import { PeJobsResponse, PeJobsResultResponse } from '~/server/alternances/infra/repositories/responses/peJobsResponse.type';

export interface AlternanceResponse {
  peJobs: PeJobsResponse
  matchas: MatchasResponse
}

export type AlternanceDetailResponse = AlternancePeJobsResponse | AlternanceMatchasResponse

export interface AlternancePeJobsResponse {
  peJobs: PeJobsResultResponse[]
}

export interface AlternanceMatchasResponse {
  matchas: MatchasResultResponse[]
}
