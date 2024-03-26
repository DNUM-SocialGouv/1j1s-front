import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { BackButtonPersistenceService } from '~/client/services/backButtonPersistence/backButtonPersistence.service';

function useDisplayBackButton(backButtonPersistenceService: BackButtonPersistenceService | false): void {
	const router = useRouter();

	useEffect(() => {
		if (!backButtonPersistenceService) {
			return;
		}
		const currentPage = backButtonPersistenceService.getCurrentPath();
		if (currentPage && currentPage !== router.pathname) {
			backButtonPersistenceService.setPreviousPath(currentPage);
		}
		backButtonPersistenceService.setCurrentPath(router.pathname);
	}, [backButtonPersistenceService, router.pathname]);
}

export default useDisplayBackButton;
