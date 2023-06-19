export function matchesInput(element: Element | null | undefined, value: string): boolean {
	if (!value) { return true; }
	if (!element) { return false; }
	return Boolean(element?.textContent?.includes(value));
}
