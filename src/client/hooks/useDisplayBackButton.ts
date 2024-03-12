import { useRouter } from 'next/router';
import { useEffect } from 'react';

import dependenciesContainer from '~/client/dependencies.container';


function useDisplayBackButton(): void {
	const router = useRouter();

	const backButtonPersistenceService = dependenciesContainer().backButtonPersistenceService;

	useEffect(() => {
		const currentPage = backButtonPersistenceService.getCurrentPath();
		if (currentPage && currentPage !== router.pathname) {
			backButtonPersistenceService.setPreviousPath(currentPage);
		}
		backButtonPersistenceService.setCurrentPath(router.pathname);
	}, [backButtonPersistenceService, router.pathname]);
}

export default useDisplayBackButton;
