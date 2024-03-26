/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import useDisplayBackButton from '~/client/hooks/useDisplayBackButton';
import { BackButtonPersistenceService } from '~/client/services/backButtonPersistence/backButtonPersistence.service';
import {
	aBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/backButtonPersistence.service.fixture';

function TestComponent(props: { backButtonPersistenceService: BackButtonPersistenceService | false }) {
	useDisplayBackButton(props.backButtonPersistenceService);
	return <></>;
}

describe('useDisplayBackButton', () => {
	describe('quand le stockage dans le sessionStorage est disponible', () => {
		describe('quand la page actuel est la première sur laquelle on navigue', () => {
			it('stocke le pathname de la page dans sessionStorage', () => {
				// Given
				mockUseRouter({
					pathname: '/',
				});
				const backButtonPersistenceService = aBackButtonPersistenceService();

				// When
				render(<TestComponent backButtonPersistenceService={backButtonPersistenceService} />);

				// Then
				expect(backButtonPersistenceService.setCurrentPath).toHaveBeenCalledWith('/');
			});
		});

		describe('quand la page actuel n’est pas la première sur laquelle on navigue', () => {
			it('stocke le pathname de la page dans sessionStorage', () => {
				// Given
				mockUseRouter({
					pathname: '/other-page',
				});
				const backButtonPersistenceService = aBackButtonPersistenceService({
					getCurrentPath: jest.fn().mockReturnValue('/'),
				});

				// When
				render(<TestComponent backButtonPersistenceService={backButtonPersistenceService} />);

				// Then
				expect(backButtonPersistenceService.setPreviousPath).toHaveBeenCalledWith('/');
				expect(backButtonPersistenceService.setCurrentPath).toHaveBeenLastCalledWith('/other-page');
			});
		});
	});
});
