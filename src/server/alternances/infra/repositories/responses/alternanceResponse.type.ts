import { MatchasResponse, MatchasResultResponse } from '~/server/alternances/infra/repositories/responses/matchasResponse.type';
import { PeJobsResponse } from '~/server/alternances/infra/repositories/responses/peJobsResponse.type';

export interface AlternanceResponse {
  peJobs: PeJobsResponse
  matchas: MatchasResponse
}

export interface AlternanceMatchasResponse {
  matchas: MatchasResultResponse[]
}
