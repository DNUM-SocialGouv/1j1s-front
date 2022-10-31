export function removeUndefinedValueInQueryParameterList(queryList: Record<string, string>): void {
  Object.keys(queryList).forEach((key: string) => {
    if (queryList[key.toString()] === '' && !queryList[key.toString()]) delete queryList[key];
  });
}
