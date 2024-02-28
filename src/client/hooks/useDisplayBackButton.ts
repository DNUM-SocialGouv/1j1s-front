import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CURRENT_PAGE = 'current-page';
export const PREVIOUS_PAGE = 'previous-page';

function useDisplayBackButton(): void {
	const router = useRouter();

	useEffect(() => {
		const currentPage = sessionStorage.getItem(CURRENT_PAGE);
		if (currentPage && currentPage !== router.pathname) {
			sessionStorage.setItem(PREVIOUS_PAGE, currentPage);
		}
		sessionStorage.setItem(CURRENT_PAGE, router.pathname);
	}, [router.pathname]);
}

export default useDisplayBackButton;
