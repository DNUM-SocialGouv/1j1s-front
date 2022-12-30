export interface RésultatRechercheÉtablissementPublicResponse {
  features: RésultatRechercheÉtablissementPublicResponse.Feature[]
}

export namespace RésultatRechercheÉtablissementPublicResponse {
  export interface Feature {
    properties: Feature.Properties
  }

  export namespace Feature {
    export interface Properties {
      id: string
      nom: string
      adresses: Properties.Adresse[]
      horaires: Properties.Horaire[]
      email?: string
      telephone: string
      pivotLocal: string
    }

    export namespace Properties {
      export interface Adresse {
        type: string
        lignes: string[]
        codePostal: string
        commune: string
      }

      export interface Horaire {
        du: string
        au: string
        heures: Horaire.Heure[]
      }

      export namespace Horaire {
        export interface Heure {
          de: string
          a: string
        }
      }
    }
  }
}
