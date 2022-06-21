export function mapDateDébutContrat(débutContrat: string | undefined): string | undefined {
  if (!débutContrat) return undefined;
  const date = new Date(débutContrat);
  return date.toLocaleDateString('fr-FR');
}
