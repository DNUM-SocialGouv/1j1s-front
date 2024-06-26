import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';


export const IS_PREVIOUS_PAGE_LOCAL = 'is-previous-page-local';

export default function usePageHistory(): void {
	const router = useRouter();
	useEffect(() => {
		return () => {
			if (isStorageAvailable('sessionStorage')) {
				sessionStorage.setItem(IS_PREVIOUS_PAGE_LOCAL, 'true');
			}
		};
	}, [router.pathname]);
}
