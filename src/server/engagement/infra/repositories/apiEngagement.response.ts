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
  id?: string
}

export interface RésultatsRechercheMissionEngagementResponse {
  total: number
  hits: Array<MissionEngagementResponse>
}
