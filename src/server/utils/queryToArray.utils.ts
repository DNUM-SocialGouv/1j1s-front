export function queryToArray(query: string | string[], separator = ','): string[] {
  return query.toString().split(separator);
}
