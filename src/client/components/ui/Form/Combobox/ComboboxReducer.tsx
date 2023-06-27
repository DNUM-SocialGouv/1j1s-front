import { RefObject } from 'react';

import { matchesInput } from '~/client/components/ui/Form/Combobox/utils';

export type ComboboxState = {
	open: boolean,
	activeDescendant: string | undefined,
	value: string,
	suggestionList: RefObject<HTMLUListElement>
}

function filterOptions(suggestionList: RefObject<HTMLUListElement>, value: string) {
	return Array.from(suggestionList.current?.querySelectorAll('[role="option"]') ?? [])
		.filter((node) => matchesInput(node, value));
}

export interface ComboboxAction {
	execute: (previousState: ComboboxState) => ComboboxState;
}
export namespace ComboboxAction {
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
				activeDescendant: undefined,
				open: false,
			};
		}
	}
	export class ToggleList implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			const { open } = previousState;
			return open
				? new CloseList().execute(previousState)
				: new OpenList().execute(previousState);
		}
	}
	export class NextOption implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			const { activeDescendant, suggestionList, value } = previousState;
			const options = filterOptions(suggestionList, value);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const nextDescendant = options[currentActiveDescendantIndex + 1] ?? options[0];
			return {
				...previousState,
				activeDescendant: nextDescendant?.id,
				open: true,
			};
		}
	}
	export class PreviousOption implements ComboboxAction {
		execute(previousState: ComboboxState): ComboboxState {
			const { activeDescendant, suggestionList, value } = previousState;
			const options = filterOptions(suggestionList, value);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const previousDescendant = options[currentActiveDescendantIndex - 1] ?? options[options.length - 1];
			return {
				...previousState,
				activeDescendant: previousDescendant?.id,
				open: true,
			};
		}
	}
	export class SetValue implements ComboboxAction {
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
	export class SelectOption implements ComboboxAction {
		private readonly option: Element | null;
		constructor(option: Element | string) {
			this.option = option instanceof Element
				? option
				: document.getElementById(option);
		}

		execute(previousState: ComboboxState): ComboboxState {
			const closeListState = new CloseList().execute(previousState);
			return {
				...closeListState,
				value: this.option?.textContent ?? '',
			};
		}
	}
}
export function ComboboxReducer(state: ComboboxState, action: ComboboxAction): ComboboxState {
	return action.execute(state);
}

