export type DetailAlternance = {
  titre: string,
  entreprise: {
    nom?: string,
  }
  localisation?: string,
  typeDeContrat?: string,
  niveauRequis?: string,
  description?: string,
  compétences?: Array<string>,
  dateDébut?: Date,
  durée?: number,
  rythmeAlternance?: string,
}
