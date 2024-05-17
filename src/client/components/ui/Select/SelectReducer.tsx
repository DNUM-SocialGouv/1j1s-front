import { RefObject } from 'react';

export type SelectState = {
	isListOptionsOpen: boolean,
	activeDescendant: string | undefined,
	optionSelectedLabel: string | undefined,
	suggestionList: RefObject<HTMLUListElement>
	visibleOptions: Array<string>
}

function getVisibleOptions(suggestionList: RefObject<HTMLUListElement>) {
	return Array.from(suggestionList.current?.querySelectorAll('[role="option"]') ?? []);
}

export interface SelectAction {
	execute: (previousState: SelectState) => SelectState;
}

export namespace SelectAction {
	export class OpenList implements SelectAction {
		execute(previousState: SelectState): SelectState {
			let activeDescendant = previousState.activeDescendant;
			if(!previousState.activeDescendant) {
				activeDescendant = getVisibleOptions(previousState.suggestionList)[0]?.id;
			}
			return {
				...previousState,
				activeDescendant: activeDescendant,
				isListOptionsOpen: true,
			};
		}
	}

	export class CloseList implements SelectAction {
		execute(previousState: SelectState): SelectState {
			return {
				...previousState,
				activeDescendant: undefined,
				isListOptionsOpen: false,
			};
		}
	}

	export class ToggleList implements SelectAction {
		execute(previousState: SelectState): SelectState {
			const { isListOptionsOpen } = previousState;
			return isListOptionsOpen
				? new CloseList().execute(previousState)
				: new OpenList().execute(previousState);
		}
	}

	export class NextOption implements SelectAction {
		execute(previousState: SelectState): SelectState {
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const nextDescendant = options[currentActiveDescendantIndex + 1] ?? options[0];
			return {
				...previousState,
				activeDescendant: nextDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class PreviousOption implements SelectAction {
		execute(previousState: SelectState): SelectState {
			const { activeDescendant, suggestionList } = previousState;
			const options = getVisibleOptions(suggestionList);
			const currentActiveDescendantIndex = options.findIndex((node) => node.id === activeDescendant);
			const previousDescendant = options[currentActiveDescendantIndex - 1] ?? options[options.length - 1];
			return {
				...previousState,
				activeDescendant: previousDescendant?.id,
				isListOptionsOpen: true,
			};
		}
	}

	export class SelectOption implements SelectAction {
		private readonly option: Element | null;

		constructor(option: Element | string) {
			this.option = option instanceof Element
				? option
				: document.getElementById(option);
		}

		execute(previousState: SelectState): SelectState {
			const closeListState = new CloseList().execute(previousState);
			return {
				...closeListState,
				optionSelectedLabel: this.option?.textContent ?? '',
			};
		}
	}
}

export function SelectReducer(state: SelectState, action: SelectAction): SelectState {
	return action.execute(state);
}

