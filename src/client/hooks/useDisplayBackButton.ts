import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { BackButtonPersistenceService } from '~/client/services/backButtonPersistence/backButtonPersistence.service';


function useDisplayBackButton(): void {
	const router = useRouter();

	const backButtonPersistenceService = useDependency<BackButtonPersistenceService>('backButtonPersistenceService');

	useEffect(() => {
		const currentPage = backButtonPersistenceService.getCurrentPath();
		if (currentPage && currentPage !== router.pathname) {
			backButtonPersistenceService.setPreviousPath(currentPage);
		}
		backButtonPersistenceService.setCurrentPath(router.pathname);
	}, [backButtonPersistenceService, router.pathname]);
}

export default useDisplayBackButton;
