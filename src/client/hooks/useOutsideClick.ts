import { RefObject,useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement>, callback: () => void) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('mouseup', handleClickOutside);
		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	}, [ref, callback]);
}
