/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import PlanDuSite from '~/pages/plan-du-site/index.page';

describe('Plan du site', () => {
	describe('quand toutes les features sont activées', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
			process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';
			process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';
		});

		it.each`
		nom                                                       | path
		${'Accueil'}                                              | ${'/'}
		
		${'Emplois'}                                              | ${'/emplois'}
		${'Stages d’études'}                                      | ${'/stages'}
		${'Stages de 3ème'}                                       | ${'/stages-3eme'}
		${'Contrats d’alternance'}                                | ${'/apprentissage'}
		${'Jobs d‘été'}                                           | ${'/jobs-ete'}
		${'Jobs étudiants'}                                       | ${'/jobs-etudiants'}
		${'Emplois en Europe'}                                    | ${'/emplois-europe'}
		${'Expérience en Europe'}                                 | ${'/europe'}
		
		${'Formations initiales'}                                 | ${'/formations-initiales'}
		${'Formations en apprentissage'}                          | ${'/formations/apprentissage'}
		${'Découvrir les métiers'}                                | ${'/decouvrir-les-metiers'}
		${'Participer à des évènements'}                          | ${'/evenements'}
		
		${'Bénévolat'}                                            | ${'/benevolat'}
		${'Service civique'}                                      | ${'/service-civique'}
		
		${'Annonces'}                                             | ${'/logements/annonces'}
		${'Aides financières au logement'}                        | ${'/logements/aides-logement'}
		
		${'Contrat Engagement Jeune'}                             | ${'/contrat-engagement-jeune'}
		${'Echanger avec un mentor'}                              | ${'/mentorat'}
		${'Trouver une structure d’accompagnement'}               | ${'/accompagnement'}
		${'Entreprendre : financements, aides et accompagnement'} | ${'/entreprendre'}
		
		${'Simulateur d’aides financières'}                       | ${'/mes-aides'}
		${'Créer son CV personnalisé'}                            | ${'/creer-mon-cv'}
		
		${'Rejoindre la mobilisation'}                            | ${'/les-entreprises-s-engagent'}
		${'Je recrute'}                                           | ${'/je-recrute'}
		${'Je deviens mentor'}                                    | ${'/je-deviens-mentor'}
		${'Je propose des immersions'}                            | ${'/immersions'}
		${'Je forme les jeunes grâce à l‘emploi'}                 | ${'/je-recrute-afpr-poei'}
		${'Découvrir les mesures employeurs'}                     | ${'/mesures-employeurs'}
		${'Accéder à mon espace'}                                 | ${'/mon-espace'}
		${'Conditions Générales d’utilisation'}                   | ${'/cgu'}
		${'Accessibilité : Partiellement conforme'}               | ${'/accessibilite'}
		${'Mentions légales'}                                     | ${'/mentions-legales'}
		${'Politique de confidentialité'}                         | ${'/confidentialite'}`(
			'présente la page $nom du site',
			async ({ nom, path }) => {
				const analyticsService = aManualAnalyticsService();

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
	});

	describe('quand il y a des features désactivées, elles ne sont pas contenues dans le plan du site', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
			process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '0';
			process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '0';
		});

		it.each`
		nom                                                       | path
		${'Stages de 3ème'}                                       | ${'/stages-3eme'}
		${'Emplois en Europe'}                                    | ${'/emplois-europe'}
		${'Formations initiales'}                                 | ${'/formations-initiales'}`
		('La page $nom n’est pas présente', async ({ nom }) => {
			const analyticsService = anAnalyticsService();

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<PlanDuSite/>
				</DependenciesProvider>,
			);

			const plan = screen.getByRole('list', { name: /Plan du site/i });
			const lien = within(plan).queryByRole('link', { name: nom });
			expect(lien).not.toBeInTheDocument();
		});
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = aManualAnalyticsService();

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
