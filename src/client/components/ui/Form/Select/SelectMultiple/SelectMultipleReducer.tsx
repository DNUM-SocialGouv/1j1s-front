export type SelectMultipleState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionsSelectedValues: Array<string>,
	visibleOptions: Array<string>
	valueTypedByUser: string
}

export interface SelectMultipleAction {
	execute: (previousState: SelectMultipleState) => SelectMultipleState;
}

export class SelectMultipleActionOpenList implements SelectMultipleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		let activeDescendant = previousState.activeDescendant;
		if (!previousState.activeDescendant) {
			activeDescendant = this.options[0]?.id;
		}
		return {
			...previousState,
			activeDescendant: activeDescendant,
			isListOptionsOpen: true,
		};
	}
}

export class SelectMultipleActionCloseList implements SelectMultipleAction {
	execute(previousState: SelectMultipleState): SelectMultipleState {
		return {
			...previousState,
			isListOptionsOpen: false,
		};
	}
}

export class SelectMultipleActionToggleList implements SelectMultipleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		const { isListOptionsOpen } = previousState;
		return isListOptionsOpen
			? new SelectMultipleActionCloseList().execute(previousState)
			: new SelectMultipleActionOpenList(this.options).execute(previousState);
	}
}

export class SelectMultipleActionSetValueTypedByUser implements SelectMultipleAction {
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

export class SelectMultipleActionFocusOptionMatchingUserInput implements SelectMultipleAction {
	private readonly userInputKey: string;
	private readonly options: Element[];

	constructor(userInputKey: string, options: Element[]) {
		this.userInputKey = userInputKey;
		this.options = options;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		function optionMatchUserInput(optionElement: Element) {
			return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
		}

		const allUserInput = previousState.valueTypedByUser.concat(this.userInputKey);
		const firstOptionMatchingUserInput = this.options.find(optionMatchUserInput);

		return {
			...previousState,
			activeDescendant: firstOptionMatchingUserInput?.id ?? previousState.activeDescendant,
			isListOptionsOpen: true,
			valueTypedByUser: allUserInput,
		};
	}
}

export class SelectMultipleActionFocusFirstOption implements SelectMultipleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		return {
			...previousState,
			activeDescendant: this.options[0]?.id,
			isListOptionsOpen: true,
		};
	}
}

export class SelectMultipleActionFocusLastOption implements SelectMultipleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		const lastOption = this.options.at(-1);
		return {
			...previousState,
			activeDescendant: lastOption?.id,
			isListOptionsOpen: true,
		};
	}
}

export class SelectMultipleActionNextOption implements SelectMultipleAction {
	private readonly options: Element[];
	private readonly numberOfOptionAfter: number;

	constructor(options: Element[], relativeNumberOfOptionAfter?: number) {
		this.options = options;
		this.numberOfOptionAfter = relativeNumberOfOptionAfter ?? 1;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const nextDescendant = this.options[currentActiveDescendantIndex + this.numberOfOptionAfter] ?? this.options.at(-1);
		return {
			...previousState,
			activeDescendant: nextDescendant?.id,
			isListOptionsOpen: true,
		};
	}
}

export class SelectMultipleActionPreviousOption implements SelectMultipleAction {
	private readonly options: Element[];
	private readonly numberOfOptionBefore: number;

	constructor(options: Element[], relativeNumberOfOptionBefore?: number) {
		this.options = options;
		this.numberOfOptionBefore = relativeNumberOfOptionBefore ?? 1;
	}

	execute(previousState: SelectMultipleState): SelectMultipleState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const previousDescendant = this.options[currentActiveDescendantIndex - this.numberOfOptionBefore] ?? this.options[0];
		return {
			...previousState,
			activeDescendant: previousDescendant?.id,
			isListOptionsOpen: true,
		};
	}
}

export class SelectMultipleActionSelectOption implements SelectMultipleAction {
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

export function SelectMultipleReducer(state: SelectMultipleState, action: SelectMultipleAction): SelectMultipleState {
	return action.execute(state);
}
