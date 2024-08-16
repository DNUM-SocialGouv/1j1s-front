import { RefObject } from 'react';

export function getOptionsElement(refListOption: RefObject<HTMLUListElement>) {
	return Array.from(refListOption.current?.querySelectorAll('[role="option"]') ?? []);
}

export type SelectMultipleState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionsSelectedValues: Array<string>,
	refListOption: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
	valueTypedByUser: string
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

	export class SetValueTypedByUser implements SelectMultipleAction {
		private readonly newValue: string;

		constructor(value: string) {
			this.newValue = value;
		}

		execute(previousState: SelectMultipleState): SelectMultipleState {
			return {
				...previousState,
				valueTypedByUser: this.newValue,
			};
		}
	}

	export class FocusOptionMatchingUserInput implements SelectMultipleAction {
		private readonly userInputKey: string;

		constructor(userInputKey: string) {
			this.userInputKey = userInputKey;
		}

		execute(previousState: SelectMultipleState): SelectMultipleState {
			function optionMatchUserInput(optionElement: Element) {
				return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
			}

			const allUserInput = previousState.valueTypedByUser.concat(this.userInputKey);
			const optionsElement = getOptionsElement(previousState.refListOption);
			const firstOptionMatchingUserInput = optionsElement.find(optionMatchUserInput);

			return {
				...previousState,
				activeDescendant: firstOptionMatchingUserInput?.id ?? previousState.activeDescendant,
				valueTypedByUser: allUserInput,
			};
		}
	}

	export class FocusFirstOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			return {
				...previousState,
				activeDescendant: getOptionsElement(previousState.refListOption)[0]?.id,
			};
		}
	}

	export class FocusLastOption implements SelectMultipleAction {
		execute(previousState: SelectMultipleState): SelectMultipleState {
			const lastOption = getOptionsElement(previousState.refListOption).at(-1);
			return {
				...previousState,
				activeDescendant: lastOption?.id,
			};
		}
	}

	export class NextOption implements SelectMultipleAction {
		private readonly numberOfOptionAfter: number;

		constructor(relativeNumberOfOptionAfter?: number) {
			this.numberOfOptionAfter = relativeNumberOfOptionAfter ?? 1;
		}

		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const nextDescendant = options[currentActiveDescendantIndex + this.numberOfOptionAfter] ?? options.at(-1);
			return {
				...previousState,
				activeDescendant: nextDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class PreviousOption implements SelectMultipleAction {
		private readonly numberOfOptionBefore: number;

		constructor(relativeNumberOfOptionBefore?: number) {
			this.numberOfOptionBefore = relativeNumberOfOptionBefore ?? 1;
		}

		execute(previousState: SelectMultipleState): SelectMultipleState {
			const { activeDescendant, refListOption } = previousState;
			const options = getOptionsElement(refListOption);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const previousDescendant = options[currentActiveDescendantIndex - this.numberOfOptionBefore] ?? options[0];
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
