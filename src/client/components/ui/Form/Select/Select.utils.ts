import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

export function isSearchableCharacter(event: KeyboardEvent) {
	return event.key.length === 1
		&& event.key !== KeyBoard.SPACE
		&& !event.altKey
		&& !event.ctrlKey
		&& !event.metaKey;
}
