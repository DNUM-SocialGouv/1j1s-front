export function transformFormToEntries(formElement: HTMLFormElement): string[][] {
  const formData = new FormData(formElement);
  return Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  ).filter((element) => element[1] !== '' && element[0] !== 'checkbox');
};

export function getValueFromForm(formElement: HTMLFormElement, keyValue: string): string | undefined {
  const formData = new FormData(formElement);
  const object = Object.fromEntries(formData)[keyValue];

  if(object) {
    return object as string;
  } else {
    return undefined;
  }
}
