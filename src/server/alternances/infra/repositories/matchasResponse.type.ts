export interface MatchasResponse {
  results: MatchasResultResponse[]
}

export interface MatchasResultResponse {
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
