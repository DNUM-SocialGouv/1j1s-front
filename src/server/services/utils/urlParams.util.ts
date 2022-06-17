// eslint-disable-next-line
export function removeUndefinedValueInQueryParameterList(queryList: Record<string, any>): void {
  Object.keys(queryList).forEach((key: string) => {
    if (!queryList[key.toString()]) delete queryList[key];
  });
}
