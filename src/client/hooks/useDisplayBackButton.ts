import { useEffect } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';


export const PREVIOUS_PAGE = 'previous-page';

function useDisplayBackButton(): void {
	useEffect(() => {
		return () => {
			if (isStorageAvailable('sessionStorage')) {
				sessionStorage.setItem(PREVIOUS_PAGE, 'true');
			}
		};
	}, []);
}

export default useDisplayBackButton;
