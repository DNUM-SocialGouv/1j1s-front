export type ComboboxState = {
	open: boolean,
	activeDescendant: string | undefined,
	value: string,
	visibleOptions: Array<string>
}

export interface ComboboxAction {
	execute: (previousState: ComboboxState) => ComboboxState;
}

export class ComboboxActionOpenList implements ComboboxAction {
	execute(previousState: ComboboxState): ComboboxState {
		return {
			...previousState,
			open: true,
		};
	}
}

export class ComboboxActionCloseList implements ComboboxAction {
	execute(previousState: ComboboxState): ComboboxState {
		return {
			...previousState,
			activeDescendant: undefined,
			open: false,
		};
	}
}

export class ComboboxActionToggleList implements ComboboxAction {
	execute(previousState: ComboboxState): ComboboxState {
		const { open } = previousState;
		return open
			? new ComboboxActionCloseList().execute(previousState)
			: new ComboboxActionOpenList().execute(previousState);
	}
}

export class ComboboxActionNextOption implements ComboboxAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: ComboboxState): ComboboxState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const nextDescendant = this.options[currentActiveDescendantIndex + 1] ?? this.options[0];
		return {
			...previousState,
			activeDescendant: nextDescendant?.id,
			open: true,
		};
	}
}

export class ComboboxActionPreviousOption implements ComboboxAction {
	private readonly options: Element[];

	constructor(options: Element[]) {
		this.options = options;
	}

	execute(previousState: ComboboxState): ComboboxState {
		const { activeDescendant } = previousState;
		const currentActiveDescendantIndex = this.options.findIndex((node) => node.id === activeDescendant);
		const previousDescendant = this.options[currentActiveDescendantIndex - 1] ?? this.options[this.options.length - 1];
		return {
			...previousState,
			activeDescendant: previousDescendant?.id,
			open: true,
		};
	}
}

export class ComboboxActionSetValue implements ComboboxAction {
	private readonly newValue: string;

	constructor(value: { toString: () => string }) {
		this.newValue = value.toString();
	}

	execute(previousState: ComboboxState): ComboboxState {
		return {
			...previousState,
			open: true,
			value: this.newValue,
		};
	}
}

export class ComboboxActionSelectOption implements ComboboxAction {
	private readonly option: Element | null;

	constructor(option: Element | string) {
		this.option = option instanceof Element
			? option
			: document.getElementById(option);
	}

	execute(previousState: ComboboxState): ComboboxState {
		const closeListState = new ComboboxActionCloseList().execute(previousState);
		return {
			...closeListState,
			value: this.option?.textContent ?? '',
		};
	}
}

export class ComboboxActionHideOption implements ComboboxAction {
	private readonly option: Element;

	constructor(option: Element) {
		this.option = option;
	}

	execute(previousState: ComboboxState): ComboboxState {
		const previousVisibleOptions = previousState.visibleOptions;
		return {
			...previousState,
			visibleOptions: previousVisibleOptions.filter((optionId) => optionId !== this.option.id),
		};
	}
}

export class ComboboxActionShowOption implements ComboboxAction {
	private readonly option: Element;

	constructor(option: Element) {
		this.option = option;
	}

	execute(previousState: ComboboxState): ComboboxState {
		const optionId = this.option.id;
		const previousVisibleOptions = previousState.visibleOptions;
		const indexOfOptionVisible = previousVisibleOptions.indexOf(optionId);
		if (indexOfOptionVisible > -1 ) return previousState;
		return {
			...previousState,
			visibleOptions: previousVisibleOptions.concat(optionId),
		};
	}
}

export function ComboboxReducer(state: ComboboxState, action: ComboboxAction): ComboboxState {
	return action.execute(state);
}

