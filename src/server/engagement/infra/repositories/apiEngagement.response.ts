interface Location {
  lat: number
  lon: number
}

export interface MissionEngagementResponse {
  location?: Location
  clientId: string
  publisherId: string
  city?: string
  description: string
  organizationName?: string
  associationName?: string
  postalCode?: string
  publisherLogo: string
  startAt?: string
  title: string
  openToMinors?: string
  _id?: string
}

export interface ConsulterMissionEngagementResponse extends MissionEngagementResponse {
  departmentName?: string
  departmentCode?: string
  region?: string
  applicationUrl?: string
  duration?: number
}

export interface RésultatsRechercheMissionEngagementResponse {
  total: number
  hits: Array<MissionEngagementResponse>
}

export interface RésultatsMissionEngagementResponse {
  ok: boolean
  data: ConsulterMissionEngagementResponse
}
