type ComboboxState = {
  open: boolean,
  activeDescendant: number | null,
	optionCount: number,
	value: string,
}

interface ComboboxAction {
	execute: (previousState: ComboboxState) => ComboboxState;
}

export namespace ComboboxActions {
	export class OpenList implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			return {
				...previousState,
				open: true,
			};
		}
	}
	export class CloseList implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			return {
				...previousState,
				activeDescendant: null,
				open: false,
			};
		}
	}
	export class NextOption implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			const { activeDescendant, optionCount } = previousState;
			return {
				...previousState,
				activeDescendant: activeDescendant != null
					? (activeDescendant + 1) % optionCount
					: 0,
				open: true,
			};
		}
	}
	export class PreviousOption implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			const { activeDescendant, optionCount } = previousState;
			const lastIndex = optionCount - 1;
			return {
				...previousState,
				activeDescendant: activeDescendant != null
					? (activeDescendant + optionCount - 1) % optionCount
					: lastIndex,
				open: true,
			};
		}
	}
	export class SetValue implements ComboboxAction {
		private readonly newValue: string;
		execute(previousState: ComboboxState): ComboboxState {
			return {
				...previousState,
				value: this.newValue,
			};
		}

		constructor(value: { toString: () => string }) {
			this.newValue = value.toString();
		}
	}
}
export function ComboboxReducer(state: ComboboxState, action: ComboboxAction): ComboboxState {
	return action.execute(state);
}

