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

