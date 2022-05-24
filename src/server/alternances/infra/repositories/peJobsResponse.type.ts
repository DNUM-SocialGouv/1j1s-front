export interface PeJobsResponse {
  results: PeJobsResultResponse[],
}

export interface PeJobsResultResponse {
  title: string,
  company: PeJobsCompanyResponse,
  job: PeJobsJobResponse
}

export interface PeJobsJobResponse {
  id: string,
  description: string,
}

export interface PeJobsCompanyResponse {
  name: string,
}
