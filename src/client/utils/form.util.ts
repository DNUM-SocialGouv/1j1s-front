export function transformFormToEntries(formElement: HTMLFormElement): string[][] {
  const formData = new FormData(formElement);
  return Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  ).filter((element) => element[1] !== '')
    .filter((element) => element[1] !== 'undefined')
    .filter((element) => element[0] !== 'checkbox');
  // TODO: ask TL for the checkbox
};
