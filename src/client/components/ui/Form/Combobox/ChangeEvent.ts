import { ChangeEvent as SyntheticChangeEvent } from 'react';

// NOTE (GAFI 29-06-2023): React gère ses events différemment du JavaScript vanilla et ne propose pas de méthode pour
//	créer des event custom (cf. https://github.com/facebook/react/issues/26991)
export class ChangeEvent<T = Element> extends Event implements SyntheticChangeEvent<T> {
	nativeEvent: Event;
	private propagationStopped = false;
	// NOTE (GAFI 21-06-2023): target is set in constructor when event is dispatched
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	readonly target: SyntheticChangeEvent<T>['target'];
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	readonly currentTarget: SyntheticChangeEvent<T>['currentTarget'];

	constructor(
		target: SyntheticChangeEvent<T>['target'],
		/* global EventInit */
		options?: EventInit,
	) {
		super('change', options);
		this.nativeEvent = this;
		target.dispatchEvent(this);
		// NOTE (GAFI 22-06-2023): related to the comment above
		Object.defineProperty(this, 'currentTarget', {
			value: target,
			writable: false,
		});
	}

	isDefaultPrevented(): boolean {
		return this.defaultPrevented;
	}

	stopPropagation() {
		super.stopPropagation();
		this.propagationStopped = true;
	}
	isPropagationStopped(): boolean {
		return this.propagationStopped;
	}

	persist(): void {
		return;
	}
}
