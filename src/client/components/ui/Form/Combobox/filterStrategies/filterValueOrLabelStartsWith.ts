export function filterValueOrLabelStartsWith(element: Element | null | undefined, currentValue: string): boolean {
	if (!currentValue) {
		return true;
	}
	if (!element) {
		return false;
	}
	const label = element?.textContent?.toLowerCase();
	const value = element?.getAttribute('data-value')?.toLowerCase();
	const lowerCasedValue = currentValue.toLowerCase();
	return Boolean(
		label?.startsWith(lowerCasedValue)
		|| value?.startsWith(lowerCasedValue),
	);
}
