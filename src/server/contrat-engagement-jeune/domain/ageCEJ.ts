export type OffreEmploiId = string;

export interface OffreEmploi {
  age?: AgeJeune.Age
}

export namespace AgeJeune {
    export enum Age {
        SEIZE = 'Débutant accepté',
        DIXSEPT = 'Expérience souhaitée',
        DIXHUIT = 'Expérience exigée',
        DIXNEUF = 'Expérience exigée',
        VINGT = 'Expérience exigée',
        VINGTUN = 'Expérience exigée',
        VINGTDEUX = 'Expérience exigée',
        VINGTTROIS = 'Débutant accepté',
        VINGTQUATRE = 'Expérience souhaitée',
        VINGTCINQ = 'Expérience exigée',
        VINGTSIX = 'Expérience exigée',
        VINGTSEPT = 'Expérience exigée',
        VINGTHUIT = 'Expérience exigée',
        VINGTNEUF = 'Expérience exigée',
        TRENTE = 'Expérience exigée',
    }

    type age = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15';

    export interface AgeCEJ {
    libellé: string;
    valeur: age;
    };

    export const SEIZE: AgeCEJ = {
      libellé: '16 ans',
      valeur: '1',
    };

    export const DIXSEPT: AgeCEJ = {
      libellé: '17 ans',
      valeur: '2',
    };

    export const DIXHUIT: AgeCEJ = {
      libellé: '18 ans',
      valeur: '3',
    };

    export const DIXNEUF: AgeCEJ = {
      libellé: '19 ans',
      valeur: '4',
    };
    
    export const VINGT: AgeCEJ = {
      libellé: '20 ans',
      valeur: '5',
    };
    
    export const VINGTUN: AgeCEJ = {
      libellé: '21 ans',
      valeur: '6',
    };

    export const VINGTDEUX: AgeCEJ = {
      libellé: '22 ans',
      valeur: '7',
    };
    
    export const VINGTTROIS: AgeCEJ = {
      libellé: '23 ans',
      valeur: '8',
    };
    
    export const VINGTQUATRE: AgeCEJ = {
      libellé: '24 ans',
      valeur: '9',
    };

    export const VINGTCINQ: AgeCEJ = {
      libellé: '25 ans',
      valeur: '10',
    };
    
    export const VINGTSIX: AgeCEJ = {
      libellé: '26 ans',
      valeur: '11',
    };
    
    export const VINGTSEPT: AgeCEJ = {
      libellé: '27 ans',
      valeur: '12',
    };

    export const VINGTHUIT: AgeCEJ = {
      libellé: '28 ans',
      valeur: '13',
    };
      
    export const VINGTNEUF: AgeCEJ = {
      libellé: '29 ans',
      valeur: '14',
    };
      
    export const TRENTE: AgeCEJ = {
      libellé: '30 ans',
      valeur: '15',
    };

    export const EXPÉRIENCE: AgeCEJ[] = [
      AgeJeune.SEIZE,
      AgeJeune.DIXSEPT,
      AgeJeune.DIXHUIT,
      AgeJeune.DIXNEUF,
      AgeJeune.VINGT,
      AgeJeune.VINGTUN,
      AgeJeune.VINGTDEUX,
      AgeJeune.VINGTTROIS,
      AgeJeune.VINGTQUATRE,
      AgeJeune.VINGTCINQ,
      AgeJeune.VINGTSIX,
      AgeJeune.VINGTSEPT,
      AgeJeune.VINGTHUIT,
      AgeJeune.VINGTNEUF,
      AgeJeune.TRENTE,
    ];
} 
