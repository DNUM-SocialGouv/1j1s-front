export function getExtrait(contenu: string, size = 120): string {
  const end = contenu.substring(size);
  const charactersLeft = end.indexOf(' ');
  const brief = contenu.substring(0, size + charactersLeft);
  return `${brief} [...]`;
}
