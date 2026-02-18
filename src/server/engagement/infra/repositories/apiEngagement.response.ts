interface Location {
  lat: number
  lon: number
}

export interface MissionEngagementResponse {
  location?: Location
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
  _id: string
	organizationLogo?: string
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

export type ApiEngagementRechercherMission = ApiEngagementRechercherMissionSansLocalisation | ApiEngagementRechercherMissionAvecLocalisation;

export interface ApiEngagementRechercherMissionSansLocalisation {
	domain?: string
	from: number
	publisher: string
	size: number
	openToMinors?: 'yes' | 'no'
}

export type ApiEngagementRechercherMissionAvecLocalisation = ApiEngagementRechercherMissionSansLocalisation & {
	distance: string
	lat: number
	lon: number
}
