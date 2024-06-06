import { RefObject } from 'react';

export type SelectSimpleState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionSelectedValue: string | undefined,
	refListOption: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
}

export function getOptionsElement(refListOption: RefObject<HTMLUListElement>) {
	return Array.from(refListOption.current?.querySelectorAll('[role="option"]') ?? []);
}

export interface SelectSimpleAction {
	execute: (previousState: SelectSimpleState) => SelectSimpleState;
}

export namespace SelectSimpleAction {
	export class OpenList implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			let activeDescendant = previousState.activeDescendant;
			if (!previousState.activeDescendant) {
				activeDescendant = getOptionsElement(previousState.refListOption)[0]?.id;
			}
			return {
				...previousState,
				activeDescendant: activeDescendant,
				isListOptionsOpen: true,
			};
		}
	}

	export class CloseList implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			return {
				...previousState,
				isListOptionsOpen: false,
			};
		}
	}

	export class ToggleList implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const { isListOptionsOpen } = previousState;
			return isListOptionsOpen
				? new CloseList().execute(previousState)
				: new OpenList().execute(previousState);
		}
	}

	export class VisualyFocusFirstOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			return {
				...previousState,
				activeDescendant: getOptionsElement(previousState.refListOption)[0]?.id,
			};
		}
	}

	export class VisualyFocusOption implements SelectSimpleAction {
		private readonly optionId: string | null;

		constructor(option: Element | string) {
			this.optionId = option instanceof Element
				? option.id
				: option;
		}

		execute(previousState: SelectSimpleState): SelectSimpleState {
			return {
				...previousState,
				activeDescendant: this.optionId ?? previousState.activeDescendant,
			};
		}
	}

	export class VisualyFocusLastOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const lastOption = getOptionsElement(previousState.refListOption).at(-1);
			return {
				...previousState,
				activeDescendant: lastOption?.id,
			};
		}
	}

	export class NextOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const nextDescendant = options[currentActiveDescendantIndex + 1] ?? options[currentActiveDescendantIndex];
			return {
				...previousState,
				activeDescendant: nextDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class PreviousOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const previousDescendant = options[currentActiveDescendantIndex - 1] ?? options[currentActiveDescendantIndex];
			return {
				...previousState,
				activeDescendant: previousDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class SelectOption implements SelectSimpleAction {
		private readonly option: Element | null;

		constructor(option: Element | string) {
			this.option = option instanceof Element
				? option
				: document.getElementById(option);
		}

		execute(previousState: SelectSimpleState): SelectSimpleState {
			const closeListState = new CloseList().execute(previousState);
			return {
				...closeListState,
				optionSelectedValue: this.option?.getAttribute('data-value') ?? '',
			};
		}
	}
}

export function SelectReducer(state: SelectSimpleState, action: SelectSimpleAction): SelectSimpleState {
	return action.execute(state);
}

export type SelectMultipleState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionsSelectedValues: Array<string>,
	refListOption: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
}


export interface SelectMultipleAction {
	execute: (previousState: SelectMultipleState) => SelectMultipleState;
}

export namespace SelectMultipleAction {
	export class OpenList implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			let activeDescendant = previousState.activeDescendant;
			if (!previousState.activeDescendant) {
				activeDescendant = getOptionsElement(previousState.refListOption)[0]?.id;
			}
			return {
				...previousState,
				activeDescendant: activeDescendant,
				isListOptionsOpen: true,
			};
		}
	}

	export class CloseList implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			return {
				...previousState,
				isListOptionsOpen: false,
			};
		}
	}

	export class ToggleList implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { isListOptionsOpen } = previousState;
			return isListOptionsOpen
				? new CloseList().execute(previousState)
				: new OpenList().execute(previousState);
		}
	}

	export class VisualyFocusFirstOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			return {
				...previousState,
				activeDescendant: getOptionsElement(previousState.refListOption)[0]?.id,
			};
		}
	}

	export class VisualyFocusLastOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const lastOption = getOptionsElement(previousState.refListOption).at(-1);
			return {
				...previousState,
				activeDescendant: lastOption?.id,
			};
		}
	}

	export class NextOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const nextDescendant = options[currentActiveDescendantIndex + 1] ?? options[currentActiveDescendantIndex];
			return {
				...previousState,
				activeDescendant: nextDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class PreviousOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const previousDescendant = options[currentActiveDescendantIndex - 1] ?? options[currentActiveDescendantIndex];
			return {
				...previousState,
				activeDescendant: previousDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class SelectOption implements SelectMultipleAction {
		private readonly option: Element | null;

		constructor(option: Element | string) {
			this.option = option instanceof Element
				? option
				: document.getElementById(option);
		}

		execute(previousState: SelectMultipleState): SelectMultipleState {
			const previousOptionsSelected = JSON.parse(JSON.stringify(previousState.optionsSelectedValues));
			const optionValueToAdd = this.option?.getAttribute('data-value');

			if (!optionValueToAdd) {
				return {
					...previousState,
					optionsSelectedValues: previousOptionsSelected,
				};
			}
			const indexOfOptionValueToAdd = previousOptionsSelected.indexOf(optionValueToAdd);

			if (indexOfOptionValueToAdd === -1) {
				previousOptionsSelected.push(optionValueToAdd);
				return {
					...previousState,
					optionsSelectedValues: previousOptionsSelected,
				};
			}

			previousOptionsSelected.splice(indexOfOptionValueToAdd, 1);

			return {
				...previousState,
				optionsSelectedValues: previousOptionsSelected,
			};
		}
	}
}

export function SelectMultipleReducer(state: SelectMultipleState, action: SelectMultipleAction): SelectMultipleState {
	return action.execute(state);
}

