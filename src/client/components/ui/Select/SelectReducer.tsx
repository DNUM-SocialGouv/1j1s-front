import { RefObject } from 'react';

export type SelectSimpleState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionSelectedValue: string | undefined,
	suggestionList: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
}

function getVisibleOptions(suggestionList: RefObject<HTMLUListElement>) {
	return Array.from(suggestionList.current?.querySelectorAll('[role="option"]') ?? []);
}

export interface SelectSimpleAction {
	execute: (previousState: SelectSimpleState) => SelectSimpleState;
}

export namespace SelectSimpleAction {
	export class OpenList implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			let activeDescendant = previousState.activeDescendant;
			if (!previousState.activeDescendant) {
				activeDescendant = getVisibleOptions(previousState.suggestionList)[0]?.id;
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
				activeDescendant: getVisibleOptions(previousState.suggestionList)[0]?.id,
			};
		}
	}

	export class VisualyFocusLastOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const lastOption = getVisibleOptions(previousState.suggestionList).at(-1);
			return {
				...previousState,
				activeDescendant: lastOption?.id,
			};
		}
	}

	export class NextOption implements SelectSimpleAction {
		execute(previousState: SelectSimpleState): SelectSimpleState {
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
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
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
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
	optionSelectedValue: Array<string>,
	suggestionList: RefObject<HTMLUListElement>
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
				activeDescendant = getVisibleOptions(previousState.suggestionList)[0]?.id;
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
				activeDescendant: getVisibleOptions(previousState.suggestionList)[0]?.id,
			};
		}
	}

	export class VisualyFocusLastOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const lastOption = getVisibleOptions(previousState.suggestionList).at(-1);
			return {
				...previousState,
				activeDescendant: lastOption?.id,
			};
		}
	}

	export class NextOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
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
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
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
			const previousOptionsSelected = JSON.parse(JSON.stringify(previousState.optionSelectedValue));
			const optionValueToAdd = this.option?.getAttribute('data-value');

			if (!optionValueToAdd) {
				return {
					...previousState,
					optionSelectedValue: previousOptionsSelected,
				};
			}
			const indexOfOptionValueToAdd = previousOptionsSelected.indexOf(optionValueToAdd);

			if (indexOfOptionValueToAdd === -1) {
				previousOptionsSelected.push(optionValueToAdd);
				return {
					...previousState,
					optionSelectedValue: previousOptionsSelected,
				};
			}

			previousOptionsSelected.splice(indexOfOptionValueToAdd, 1);

			return {
				...previousState,
				optionSelectedValue: previousOptionsSelected,
			};
		}
	}
}

export function SelectMultipleReducer(state: SelectMultipleState, action: SelectMultipleAction): SelectMultipleState {
	return action.execute(state);
}

