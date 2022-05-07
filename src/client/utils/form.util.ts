export function transformFormFormToRecord(formElement: HTMLFormElement): Record<string, string> {
  const formData = new FormData(formElement);
  const formEntries = Array.from(
    formData,
    ([key, value]) => (
      [key, typeof value === 'string' ? value : value.name]
    ),
  );
  return Object.fromEntries(formEntries) as unknown as Record<string, string>;
};
