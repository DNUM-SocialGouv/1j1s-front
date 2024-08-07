import { useEffect } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

export function useKeyPress(callback: () => void) {
	useEffect(() => {
		function handleKeyPress(event: KeyboardEvent) {
			if (event.key === KeyBoard.SPACE || event.key === KeyBoard.ESCAPE) {
				callback();
			}
		}

		document.addEventListener('keyup', handleKeyPress);
		return () => {
			document.removeEventListener('keyup', handleKeyPress);
		};
	}, [callback]);
}
