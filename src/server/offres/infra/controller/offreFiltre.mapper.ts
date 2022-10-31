import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { OffreEmploiFiltreLocalisation } from '~/server/offres/domain/offre';

export function mapLocalisation(query: { [key: string]: string | string[] | undefined }): OffreEmploiFiltreLocalisation | undefined {
  const { codeLocalisation, typeLocalisation } = query;
  return (typeLocalisation as TypeLocalisation in TypeLocalisation)
    ? {
      code: String(codeLocalisation),
      type: typeLocalisation as TypeLocalisation,
    }
    : undefined;
}

export function toArray(query: string | string[]): string[] {
  return query.toString().split(',');
}
