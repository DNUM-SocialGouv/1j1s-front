export interface PeJobsResponse {
  results: PeJobsResultResponse[]
}

type IdeaType = 'peJob'
export interface PeJobsResultResponse {
  ideaType: IdeaType
  title: string
  company?: PeJobsCompanyResponse
  job: PeJobsJobResponse
  diplomaLevel?: string
  place?: PeJobsPlaceResponse
  contact?: PeJobsContactResponse
  url: string
}

export interface PeJobsJobResponse {
  id: string
  description: string
  contractType?: string
  contractDescription?: string
  contractDuration?: string
  duration?: string
}

export interface PeJobsPlaceResponse {
  city?: string
  fullAddress?: string
}

export interface PeJobsCompanyResponse {
  name?: string
  logo?: string
}
export interface PeJobsContactResponse {
  name?: string
  phone?: string
}
