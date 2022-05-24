export interface MatchasResponse {
  results: MatchasResultResponse[],
}

export interface MatchasResultResponse {
  title: string,
  company: MatchasCompanyResponse,
  job: MatchasJobResponse,
}

export interface MatchasJobResponse {
  id: string;
  romeDetails?: MatchasJobRomeDetailsResponse,
}

export interface MatchasJobRomeDetailsResponse {
  definition?: string,
}

export interface MatchasCompanyResponse {
  name: string,
}
