// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormAsQuery(formElement: HTMLFormElement, queryParamsWhitelist: Record<string, any>, appendPageQueryParam = true): string {
  const formData = new FormData(formElement);
  const formEntries = Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  ).filter((element) => element[0] in queryParamsWhitelist && element[1] !== '' && element[1] !== 'false');
  if (appendPageQueryParam) {
    formEntries.push(['page', '1']);
  }

  return new URLSearchParams(formEntries).toString();
}
