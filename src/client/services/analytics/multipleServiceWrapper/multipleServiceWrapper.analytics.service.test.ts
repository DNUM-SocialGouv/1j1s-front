/**
 * @jest-environment jsdom
 */

import { anAnalyticsService, aPageTags } from '~/client/services/analytics/analytics.service.fixture';
import {
	MultipleAnalyticsServiceWrapper,
} from '~/client/services/analytics/multipleServiceWrapper/multipleAnalyticsServiceWrapper';



describe('MultipleAnalyticsServiceWrapper', () => {
	describe('envoyerAnalyticsPageVue', () => {
		it('envoie les analytics uniquement aux service autorisés uniquement', () => {
			// Given
			const serviceAutorisé = anAnalyticsService({
				isAllowed: () => true,
			});
			const serviceNonAutorisé = anAnalyticsService({
				isAllowed: () => false,
			});
			const pageTags = aPageTags();
			const multipleAnalyticsServiceWrapper = new MultipleAnalyticsServiceWrapper([serviceAutorisé, serviceNonAutorisé]);

			// When
			multipleAnalyticsServiceWrapper.envoyerAnalyticsPageVue(pageTags);

			// Then
			expect(serviceAutorisé.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
			expect(serviceNonAutorisé.envoyerAnalyticsPageVue).not.toHaveBeenCalled();
		});
	});

	describe('isAllowed', () => {
		it('répond true si au moins un des services est autorisé', () => {
			// Given
			const serviceAutorisé = anAnalyticsService({
				isAllowed: () => true,
			});
			const serviceNonAutorisé = anAnalyticsService({
				isAllowed: () => false,
			});
			const multipleAnalyticsServiceWrapper = new MultipleAnalyticsServiceWrapper([serviceAutorisé, serviceNonAutorisé]);

			// When Then
			expect(multipleAnalyticsServiceWrapper.isAllowed()).toBeTruthy();
		});
		it('répond false si aucun des services n\'est autorisé', () => {
			const serviceNonAutorisé = anAnalyticsService({
				isAllowed: () => false,
			});
			const multipleAnalyticsServiceWrapper = new MultipleAnalyticsServiceWrapper([serviceNonAutorisé]);

			// When Then
			expect(multipleAnalyticsServiceWrapper.isAllowed()).toBeFalsy();
		});

	});
});
