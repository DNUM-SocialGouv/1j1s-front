export type SelectSimpleState = {
	open: boolean,
	activeDescendant: string | undefined,
	selectedValue: string | undefined,
	visibleOptions: Array<string>
	userInput: string
}

export interface SelectSimpleAction {
	execute: (previousState: SelectSimpleState) => SelectSimpleState;
}

export class SelectSimpleActionOpenList implements SelectSimpleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		let activeDescendant = previousState.activeDescendant;
		if (!previousState.activeDescendant) {
			activeDescendant = this.options[0]?.id;
		}
		return {
			...previousState,
			activeDescendant: activeDescendant,
			open: true,
		};
	}
}

export class SelectSimpleActionCloseList implements SelectSimpleAction {
	execute(previousState: SelectSimpleState): SelectSimpleState {
		return {
			...previousState,
			open: false,
		};
	}
}

export class SelectSimpleActionToggleList implements SelectSimpleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { open } = previousState;
		return open
			? new SelectSimpleActionCloseList().execute(previousState)
			: new SelectSimpleActionOpenList(this.options).execute(previousState);
	}
}

export class SelectSimpleActionSetValueTypedByUser implements SelectSimpleAction {
	private readonly newValue: string;

	constructor(value: string) {
		this.newValue = value;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		return {
			...previousState,
			userInput: this.newValue,
		};
	}
}

export class SelectSimpleActionClearUserInput implements SelectSimpleAction {
	execute(previousState: SelectSimpleState): SelectSimpleState {
		return {
			...previousState,
			userInput: '',
		};
	}
}

export class SelectSimpleActionFocusOptionMatchingUserInput implements SelectSimpleAction {
	private readonly userInputKey: string;
	private readonly options: Element[];

	constructor(userInputKey: string, options: Element[]) {
		this.userInputKey = userInputKey;
		this.options = options;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		function optionMatchUserInput(optionElement: Element) {
			return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
		}

		const allUserInput = previousState.userInput.concat(this.userInputKey);
		const firstOptionMatchingUserInput = this.options.find(optionMatchUserInput);

		return {
			...previousState,
			activeDescendant: firstOptionMatchingUserInput?.id ?? previousState.activeDescendant,
			open: true,
			userInput: allUserInput,
		};
	}
}

export class SelectSimpleActionFocusFirstOption implements SelectSimpleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		return {
			...previousState,
			activeDescendant: this.options[0]?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionFocusLastOption implements SelectSimpleAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const lastOption = this.options.at(-1);
		return {
			...previousState,
			activeDescendant: lastOption?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionNextOption implements SelectSimpleAction {
	private readonly options: Element[];
	private readonly numberOfOptionAfter: number;

	constructor(options: Element[], relativeNumberOfOptionAfter?: number) {
		this.options = options;
		this.numberOfOptionAfter = relativeNumberOfOptionAfter ?? 1;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const nextDescendant = this.options[currentActiveDescendantIndex + this.numberOfOptionAfter] ?? this.options.at(-1);
		return {
			...previousState,
			activeDescendant: nextDescendant?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionPreviousOption implements SelectSimpleAction {
	private readonly options: Element[];
	private readonly numberOfOptionBefore: number;

	constructor(options: Element[], relativeNumberOfOptionBefore?: number) {
		this.options = options;
		this.numberOfOptionBefore = relativeNumberOfOptionBefore ?? 1;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const previousDescendant = this.options[currentActiveDescendantIndex - this.numberOfOptionBefore] ?? this.options[0];
		return {
			...previousState,
			activeDescendant: previousDescendant?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionSelectOption implements SelectSimpleAction {
	private readonly option: Element | null;

	constructor(option: Element | string) {
		this.option = option instanceof Element
			? option
			: document.getElementById(option);
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const closeListState = new SelectSimpleActionCloseList().execute(previousState);
		return {
			...closeListState,
			selectedValue: this.option?.getAttribute('data-value') ?? '',
		};
	}
}

export function SelectSimpleReducer(state: SelectSimpleState, action: SelectSimpleAction): SelectSimpleState {
	return action.execute(state);
}
