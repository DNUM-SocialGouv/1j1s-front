export interface ÉtablissementAccompagnement {
  nom: string;
  adresse?: string;
  id: string
  telephone: string;
  email?: string;
  horaires: ÉtablissementAccompagnement.Horaire[];
}

export namespace ÉtablissementAccompagnement {
  export interface Horaire {
    jour: string;
    heures: Horaire.Heure[];
  }

  export namespace Horaire {
    export interface Heure {
      début: string;
      fin: string;
    }
  }
}
