/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import PlanDuSite from '~/pages/plan-du-site/index.page';

describe('Plan du site', () => {
	it.each`
	  nom                                         | path
    ${'Accueil'}                                | ${'/'}
    ${'Emplois'}                                | ${'/emplois'}
    ${'Stages'}                                 | ${'/stages'}
    ${'Contrats d’alternance'}                  | ${'/apprentissage'}
    ${'Jobs étudiants'}                         | ${'/jobs-etudiants'}
    ${'Emplois en Europe'}                      | ${'/europe'}
    ${'Formations'}                             | ${'/formations'}
    ${'Découvrir les métiers'}                  | ${'/decouvrir-les-metiers'}
    ${'Participer à un évènement'}              | ${'/evenements'}
    ${'Contrat Engagement Jeune'}               | ${'/contrat-engagement-jeune'}
    ${'Mes aides financières'}                  | ${'/mes-aides'}
    ${'Mes aides au logement'}                  | ${'/logements/aides-logement'}
    ${'Le mentorat'}                            | ${'/mentorat'}
    ${'Je crée mon CV personnalisé'}            | ${'/creer-mon-cv'}
    ${'Entreprendre'}                           | ${'/entreprendre'}
    ${'Accompagnement'}                         | ${'/accompagnement'}
    ${'Actualités et services jeunes'}          | ${'/espace-jeune'}
    ${'Le service civique'}                     | ${'/service-civique'}
    ${'Le bénévolat'}                           | ${'/benevolat'}
    ${'Annonces'}                               | ${'/logements/annonces'}
    ${'Rejoindre la mobilisation'}              | ${'/les-entreprises-s-engagent'}
    ${'Je recrute'}                             | ${'/je-recrute'}
    ${'Je deviens mentor'}                      | ${'/je-deviens-mentor'}
    ${'Je propose des immersions'}              | ${'/immersions'}
    ${'Je forme les jeunes grâce à l‘emploi'}   | ${'/je-recrute-afpr-poei'}
    ${'Découvrir les mesures employeurs'}       | ${'/mesures-employeurs'}
    ${'Accéder à mon espace'}                   | ${'/mon-espace'}
    ${'Conditions Générales d’utilisation'}     | ${'/cgu'}
    ${'Accessibilité : Partiellement conforme'} | ${'/accessibilite'}
    ${'Mentions légales'}                       | ${'/mentions-legales'}
    ${'Politique de confidentialité'}           | ${'/confidentialite'}
    ${'Nous contacter'}                         | ${'mailto:contact-1j1s@sg.social.gouv.fr'}`(
		'présente la page $nom du site', 
		async ({ nom, path }) => {
			const analyticsService = anAnalyticsService();

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<PlanDuSite/>
				</DependenciesProvider>,
			);

			const plan = screen.getByRole('list', { name: /Plan du site/i });
			const lien = within(plan).getByRole('link', { name: nom });
			expect(lien).toBeVisible();
			expect(lien).toHaveAttribute('href', path);
		});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<PlanDuSite/>
			</DependenciesProvider>,
		);
		
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_statique',
			pagegroup: 'contenu_statique',
			pagelabel: 'contenu_statique',
			'segment-site': 'page_de_base',
		});
	});
});
