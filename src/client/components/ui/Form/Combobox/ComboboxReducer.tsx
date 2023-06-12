import { InvalidActionError } from '~/client/components/ui/Form/Combobox/InvalidActionError';

type ComboboxState = {
  open: boolean,
  activeDescendant: number | null,
}

type ComboboxAction = 'nextDescendant' | 'previousDescendant'

export function ComboboxReducer({ activeDescendant }: ComboboxState, action: ComboboxAction): ComboboxState {
	switch (action) {
		case 'nextDescendant':
			return {
				activeDescendant: activeDescendant != null ? activeDescendant + 1 : 0,
				open: true,
			};
		default:
			throw new InvalidActionError(action);
	}
}

