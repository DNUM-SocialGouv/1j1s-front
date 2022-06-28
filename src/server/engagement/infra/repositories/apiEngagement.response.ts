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
  departmentName?: string
  departmentCode?: string
  region?: string
  applicationUrl?: string
  publisherLogo: string
  startAt?: string
  duration?: number
  title: string
  openToMinors?: string
  id?: string
}

export interface RésultatsRechercheMissionEngagementResponse {
  total: number
  hits: Array<MissionEngagementResponse>
}

export interface RésultatMissionEngagementResponse {
  data: MissionEngagementResponse
}
