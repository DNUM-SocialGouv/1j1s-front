export interface DemandeDeContact {
    prénom: string
    nom: string
    email: string
    téléphone: string
    ville: string
    age: Age
}

type Age = 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
