export function removeUndefinedValueInQueryParameterList(queryList: Record<string, any>) {
  Object.keys(queryList).forEach((key: string) => {
    if (!queryList[key.toString()]) delete queryList[key];
  });
}
