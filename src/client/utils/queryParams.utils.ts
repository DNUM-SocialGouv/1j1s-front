import { ParsedUrlQuery } from 'querystring';

export const hasQueryParams = (queryParams: ParsedUrlQuery): boolean =>  !!(queryParams && Object.keys(queryParams).length > 0);

export const isKeyInQueryParams = (queryParams: ParsedUrlQuery, key: string): boolean => !!queryParams[key];

export const getQueryValue = (queryParams: ParsedUrlQuery, key: string): string => <string>queryParams[key];

export const getQueryString = (queryParams: ParsedUrlQuery): string => new URLSearchParams(Object.entries(queryParams) as unknown as URLSearchParams).toString();

export function getSingleQueryParam(queryParam: string | string[] | undefined): string | undefined {
  return typeof queryParam === 'string' ? queryParam : undefined;
}
