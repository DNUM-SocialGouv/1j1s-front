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

export namespace ApiEngagement {
  export type RechercherMission = RechercherMission.SansLocalisation | RechercherMission.AvecLocalisation;

  export namespace RechercherMission {
    export interface SansLocalisation {
      domain?: string
      from: number
      publisher: string
      size: number
      openToMinors?: 'yes' | 'no'
    }

    export type AvecLocalisation = SansLocalisation & {
      distance: string
      lat: number
      lon: number
    }
  }
}
