// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormAsQuery(formElement: HTMLFormElement, queryParamsWhitelist: Record<string, any>, appendPageQueryParam = true): string {
	const formData = new FormData(formElement);
	const formEntries = Array.from(
		formData,
		([key, value]) => (
			[key, typeof value === 'string' ? value : value.name]
		),
	).filter((inputData) => {
		const inputName = inputData[0];
		const inputValue = inputData[1];
		return inputName in queryParamsWhitelist && inputValue !== '' && inputValue !== 'false';
	});

	if (appendPageQueryParam) {
		formEntries.push(['page', '1']);
	}

	return new URLSearchParams(formEntries).toString();
}
