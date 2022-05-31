export function transformFormToEntries(formElement: HTMLFormElement, keyToDelete = ''): string[][] {
  const formData = new FormData(formElement);
  if(keyToDelete !== '') formData.delete(keyToDelete);
  return Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  ).filter((element) => element[1] !== '' && element[0] !== 'checkbox');
};

export function getFormValue(formElement: HTMLFormElement, keyValue: string): string | undefined {
  const formData = new FormData(formElement);
  const value = Object.fromEntries(formData)[keyValue];

  if(value) {
    return value as string;
  } else {
    return undefined;
  }
}
