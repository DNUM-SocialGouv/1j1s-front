export function matchesInput(element: Element | null | undefined, value: string): boolean {
	if (!value) { return true; }
	if (!element) { return false; }
	const option = element?.textContent?.toLowerCase();
	return Boolean(option?.includes(value.toLowerCase()));
}
