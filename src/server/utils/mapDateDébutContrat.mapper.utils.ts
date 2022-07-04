export function mapDateDébutContrat(débutContrat: string | undefined): string | undefined {
  if (!débutContrat) return undefined;
  const date = new Date(débutContrat);
  return date.toLocaleDateString('fr-FR');
}

export function mapDateDébutContratLong(débutContrat: string | undefined): string | undefined {
  if (!débutContrat) return undefined;
  const date = new Date(débutContrat);
  return date.toLocaleDateString('fr-FR', { day : 'numeric', month : 'long', year : 'numeric' });
}

export function mapDateDébutContratEtiquette(débutContrat: string | undefined): string | undefined {
  if (!débutContrat) return undefined;
  const date = new Date(débutContrat);
  return `Dès le ${date.toLocaleDateString('fr-FR', { day : 'numeric', month : 'long', year : 'numeric' })}`;
}
