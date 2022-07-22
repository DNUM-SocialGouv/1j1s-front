export function getFormAsQuery(formElement: HTMLFormElement, appendPageQueryParam = true): string {
  const formData = new FormData(formElement);

  const formEntries = Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  ).filter((element) => {

    return element[1] !== '' && element[1] !== 'false';
  });
  if (appendPageQueryParam) {
    formEntries.push(['page', '1']);
  }

  return new URLSearchParams(formEntries).toString();
};

export function getFormValue(formElement: HTMLFormElement, keyValue: string): string | undefined {
  const formData = new FormData(formElement);
  const value = Object.fromEntries(formData)[keyValue];
  return value ? value as string : undefined;
}
