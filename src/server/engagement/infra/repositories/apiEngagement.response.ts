interface Location {
  lat: number
  lon: number
}

export interface MissionEngagementResponse {
  location: Location
  tasks: Array<string>
  audience: Array<string>
  associationReseaux?: Array<string>
  associationSources?: Array<string>
  soft_skills: Array<string>
  remote: string
  deleted?: string
  clientId: string
  publisherId: string
  activity: string
  adresse: string
  applicationUrl: string
  city: string
  country?: string
  createdAt: string
  departmentCode: string
  departmentName: string
  description: string
  domain: string
  endAt?: string
  lastSyncAt?: string
  organizationFullAddress: string
  organizationId?: string
  organizationName: string
  organizationUrl: string
  places: number,
  postalCode: string
  postedAt: string
  publisherLogo: string
  publisherName: string
  publisherUrl: string
  startAt: string
  title: string
  updatedAt: string
  region: string
  jobboard_indeed_status?: string
  priority: string
  organizationDescription?: string
  organizationCity: string
  organizationPostCode: string
  statusCode?: string
  statusComment?: string
  associationTags?: Array<any>
  associationId: string
  associationName: string
  associationRNA: string
  associationSiren?: string | null
  organizationFamille?: string
  organizationRNA?: string
  organizationTheme?: string
  organizationStatusJuridique?: string
  domainLogo: string
  metadata?: string

  id?: string
}

export interface RésultatsRechercheMissionEngagementResponse {
  total: number
  hits: Array<MissionEngagementResponse>
}
