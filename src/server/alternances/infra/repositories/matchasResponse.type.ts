export interface MatchasResponse {
  results: MatchasResultResponse[]
}
type IdeaType = 'matcha'
export interface MatchasResultResponse {
  ideaType: IdeaType
  title: string
  company?: MatchasCompanyResponse
  job: MatchasJobResponse
  diplomaLevel?: string
  place?: MatchasPlaceResponse
  contact?: MatchasContactResponse
}

export interface MatchasJobResponse {
  id: string
  romeDetails: MatchasJobRomeDetailsResponse
  contractType?: string[]
  jobStartDate?: string
  dureeContrat: number
  rythmeAlternance: string
}

export interface MatchasPlaceResponse {
  city?: string
  fullAddress?: string
}

export interface MatchasCompetencesDeBaseResponse {
  libelle: string
}

export interface MatchasJobRomeDetailsResponse {
  definition: string
  competencesDeBase: MatchasCompetencesDeBaseResponse[]
}

export interface MatchasCompanyResponse {
  name?: string
  logo?: string
}

export interface MatchasContactResponse {
  name?: string
  phone?: string
}
