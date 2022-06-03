export interface PeJobsResponse {
  results: PeJobsResultResponse[]
}

type IdeaType = 'peJob'
export interface PeJobsResultResponse {
  ideaType: IdeaType
  title: string
  company: PeJobsCompanyResponse
  job: PeJobsJobResponse
  diplomaLevel: string | null
  place: PeJobsPlaceResponse
}

export interface PeJobsJobResponse {
  id: string
  description: string
  contractType: string
}

export interface PeJobsPlaceResponse {
  city: string
}

export interface PeJobsCompanyResponse {
  name: string
  logo?: string
}
