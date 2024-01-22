// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DebounceFunction<T extends (...args: any[]) => any> {
		debounced: (...args: Parameters<T>) => void;
		cancel: () => void;
	}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): DebounceFunction<T> {
	let timeoutId: ReturnType<typeof setTimeout>;

	const debounced = function (...args: Parameters<T>): void {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};

	const cancel = function (): void {
		clearTimeout(timeoutId);
	};

	return { cancel, debounced };
};
