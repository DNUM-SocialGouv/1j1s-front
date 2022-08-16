export interface DemandeDeContact {
    prénom: string
    nom: string
    email: string
    téléphone: string
    ville: string
    age: Age
}

type Age = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export function Age (a: number): Age {
  if (a >= 16 && a<=30 && Math.floor(a) === a) {
    return a as Age;
  }
  throw Error(`${a} n'est un âge valide`);
}
