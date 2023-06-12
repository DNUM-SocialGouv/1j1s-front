type ComboboxState = {
  open: boolean,
  activeDescendant: number | null,
	optionCount: number,
}

type ComboboxAction = 'openList' | 'closeList' | 'nextOption' | 'previousOption'

export function ComboboxReducer(state: ComboboxState, action: ComboboxAction): ComboboxState {
	const { activeDescendant, optionCount } = state;
	const lastIndex = optionCount - 1;

	switch (action) {
		case 'openList':
			return {
				...state,
				open: true,
			};
		case 'closeList':
			return {
				...state,
				activeDescendant: null,
				open: false,
			};
		case 'nextOption':
			return {
				...state,
				activeDescendant: activeDescendant != null
					? (activeDescendant + 1) % optionCount
					: 0,
				open: true,
			};
		case 'previousOption':
			return {
				...state,
				activeDescendant: activeDescendant != null
					? (activeDescendant + optionCount - 1) % optionCount
					: lastIndex,
				open: true,
			};
	}
}

