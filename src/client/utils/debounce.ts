export interface DebounceFunction<T extends (...args: unknown[]) => unknown> {
		debounced: (...args: Parameters<T>) => void;
		cancel: () => void;
	}

export function debounce<T extends (...args: unknown[]) => unknown>(
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
