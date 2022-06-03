export interface MatchasResponse {
  results: MatchasResultResponse[]
}
type IdeaType = 'matcha'
export interface MatchasResultResponse {
  ideaType: IdeaType
  title: string
  company: MatchasCompanyResponse
  job: MatchasJobResponse
  diplomaLevel: string
  place: MatchasPlaceResponse
}

export interface MatchasJobResponse {
  id: string
  romeDetails?: MatchasJobRomeDetailsResponse
  contractType: string[]
}

export interface MatchasPlaceResponse {
  city: string
}
export interface MatchasJobRomeDetailsResponse {
  definition: string
}

export interface MatchasCompanyResponse {
  name: string
  logo?: string
}
