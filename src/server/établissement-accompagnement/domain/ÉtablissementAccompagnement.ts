export interface ÉtablissementAccompagnement {
  nom: string
  adresse?: string
  id: string
  telephone: string
  email?: string
  horaires: ÉtablissementAccompagnement.Horaire[]
  type: TypeÉtablissement
}

export type ContactÉtablissementAccompagnement = Required<Pick<ÉtablissementAccompagnement, 'nom' | 'email' | 'type'>>

export namespace ÉtablissementAccompagnement {
  export interface Horaire {
    jour: string
    heures: Horaire.Heure[]
  }

  export namespace Horaire {
    export interface Heure {
      début: string
      fin: string
    }
  }
}

export enum TypeÉtablissement {
  AGENCE_POLE_EMPLOI = 'pole_emploi',
  MISSION_LOCALE = 'mission_locale',
  INFO_JEUNE = 'cij',
}
