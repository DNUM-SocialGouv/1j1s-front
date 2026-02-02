import { RefObject } from 'react';

export type SelectSimpleState = {
	open: boolean,
	activeDescendant: string | undefined,
	selectedValue: string | undefined,
	refListOption: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
	userInput: string
}

export function getOptionsElement(refListOption: RefObject<HTMLElement>) {
	return Array.from(refListOption.current?.querySelectorAll('[role="option"]') ?? []);
}

export interface SelectSimpleAction {
	execute: (previousState: SelectSimpleState) => SelectSimpleState;
}

export class SelectSimpleActionOpenList implements SelectSimpleAction {
	execute(previousState: SelectSimpleState): SelectSimpleState {
		let activeDescendant = previousState.activeDescendant;
		if (!previousState.activeDescendant) {
			activeDescendant = getOptionsElement(previousState.refListOption)[0]?.id;
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
	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { open } = previousState;
		return open
			? new SelectSimpleActionCloseList().execute(previousState)
			: new SelectSimpleActionOpenList().execute(previousState);
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

	constructor(userInputKey: string) {
		this.userInputKey = userInputKey;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		function optionMatchUserInput(optionElement: Element) {
			return optionElement.textContent?.toLowerCase().startsWith(allUserInput.toLowerCase());
		}

		const allUserInput = previousState.userInput.concat(this.userInputKey);
		const optionsElement = getOptionsElement(previousState.refListOption);
		const firstOptionMatchingUserInput = optionsElement.find(optionMatchUserInput);

		return {
			...previousState,
			activeDescendant: firstOptionMatchingUserInput?.id ?? previousState.activeDescendant,
			open: true,
			userInput: allUserInput,
		};
	}
}

export class SelectSimpleActionFocusFirstOption implements SelectSimpleAction {
	execute(previousState: SelectSimpleState): SelectSimpleState {
		return {
			...previousState,
			activeDescendant: getOptionsElement(previousState.refListOption)[0]?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionFocusLastOption implements SelectSimpleAction {
	execute(previousState: SelectSimpleState): SelectSimpleState {
		const lastOption = getOptionsElement(previousState.refListOption).at(-1);
		return {
			...previousState,
			activeDescendant: lastOption?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionNextOption implements SelectSimpleAction {
	private readonly numberOfOptionAfter: number;

	constructor(relativeNumberOfOptionAfter?: number) {
		this.numberOfOptionAfter = relativeNumberOfOptionAfter ?? 1;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { activeDescendant, refListOption } = previousState;
		const options = getOptionsElement(refListOption);
		const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
		const nextDescendant = options[currentActiveDescendantIndex + this.numberOfOptionAfter] ?? options.at(-1);
		return {
			...previousState,
			activeDescendant: nextDescendant?.id,
			open: true,
		};
	}
}

export class SelectSimpleActionPreviousOption implements SelectSimpleAction {
	private readonly numberOfOptionBefore: number;

	constructor(relativeNumberOfOptionBefore?: number) {
		this.numberOfOptionBefore = relativeNumberOfOptionBefore ?? 1;
	}

	execute(previousState: SelectSimpleState): SelectSimpleState {
		const { activeDescendant, refListOption } = previousState;
		const options = getOptionsElement(refListOption);
		const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
		const previousDescendant = options[currentActiveDescendantIndex - this.numberOfOptionBefore] ?? options[0];
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
