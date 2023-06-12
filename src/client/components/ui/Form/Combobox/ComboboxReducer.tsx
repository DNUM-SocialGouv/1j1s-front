type ComboboxState = {
  open: boolean,
  activeDescendant: number | null,
	optionCount: number,
}

type ComboboxAction = 'nextDescendant' | 'previousDescendant'

export function ComboboxReducer(state: ComboboxState, action: ComboboxAction): ComboboxState {
	const { activeDescendant, optionCount } = state;
	const lastIndex = optionCount - 1;

	switch (action) {
		case 'nextDescendant':
			return {
				...state,
				activeDescendant: activeDescendant != null
					? (activeDescendant + 1) % optionCount
					: 0,
				open: true,
			};
		case 'previousDescendant':
			return {
				...state,
				activeDescendant: activeDescendant != null
					? (activeDescendant + optionCount - 1) % optionCount
					: lastIndex,
				open: true,
			};
	}
}

