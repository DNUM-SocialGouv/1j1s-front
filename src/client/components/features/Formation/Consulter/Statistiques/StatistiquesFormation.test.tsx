/**
 * @jest-environment jsdom
 */
import {
	render,
	screen,
	within,
} from '@testing-library/react';

import { StatistiquesFormation } from '~/client/components/features/Formation/Consulter/Statistiques/StatistiquesFormation';
import { Certification } from '~/server/formations/domain/certification';

const statistiques = (override?: Partial<Certification>) :Certification => {
	return {
		millesime: '2020-2021',
		region: 'Pays de la Loire',
		tauxAutres6Mois: '12',
		tauxEnEmploi6Mois: '36',
		tauxEnFormation: '22',
		...override,
	};
};
describe('StatistiquesFormation', () => {
	describe('quand on reçoit des statistiques', () => {
		describe('quand on ne reçoit aucune valeurs statistiques', () => {
			it('ne retourne rien', () => {
				render(<StatistiquesFormation statistiques={statistiques({ tauxAutres6Mois: undefined, tauxEnEmploi6Mois: undefined, tauxEnFormation: undefined })}/>);

				const entête = screen.queryByRole('heading', { level: 2 });
				expect(entête).not.toBeInTheDocument();

				const listeDeStatistique = screen.queryByRole('list', { name: 'statistiques' });
				expect(listeDeStatistique).not.toBeInTheDocument();
			});
		});

		it('affiche l’entête', () => {
			render(<StatistiquesFormation statistiques={statistiques()}/>);

			const entête =  screen.getByRole('heading', { level: 2 });
			expect(entête).toHaveTextContent('Et après la formation ?');
			expect(entête).toBeVisible();

			const descriptionEntTête = screen.getByText('Découvrez les chiffres-clés liés à cette formation pour la région Pays de la Loire');
			expect(descriptionEntTête).toBeVisible();
		});

		it('affiche les informations de statistiques', () => {
			render(<StatistiquesFormation statistiques={statistiques()}/>);

			const listeDeStatistique = screen.getByRole('list', { name: 'statistiques' });
			expect(listeDeStatistique).toBeInTheDocument();
		});

		describe('concernant le taux en emploi après 6 mois', () => {
			describe('quand on ne reçoit pas l’information', () => {
				it('ne retourne rien', () => {
					render(<StatistiquesFormation statistiques={statistiques({ tauxEnEmploi6Mois: undefined })}/>);

					const tauxEnEmploi6Mois = screen.queryByText('sont en emploi au bout de 6 mois (quel que soit le type d’emploi et son secteur)');
					expect(tauxEnEmploi6Mois).not.toBeInTheDocument();
				});
			});

			describe('quand on reçoit l’information', () => {
				it('affiche le taux', () => {
					render(<StatistiquesFormation statistiques={statistiques()}/>);


					const listeDeStatistique = screen.getByRole('list', { name: 'statistiques' });
					const tauxEnEmploi6Mois = within(listeDeStatistique).getByText('sont en emploi au bout de 6 mois (quel que soit le type d’emploi et son secteur)');
					expect(tauxEnEmploi6Mois).toBeVisible();
					const tauxEnEmploi6MoisPourcentage = within(listeDeStatistique).getByText('36%');
					expect(tauxEnEmploi6MoisPourcentage).toBeVisible();
				});
			});
		});

		describe('concernant le taux en formation', () => {
			describe('quand on ne reçoit pas l’information', () => {
				it('ne retourne rien', () => {
					render(<StatistiquesFormation statistiques={statistiques({ tauxEnFormation: undefined })}/>);

					const tauxEnFormation = screen.queryByText('sont inscrits en formation (formation supérieure, redoublants, changement de filière)');
					expect(tauxEnFormation).not.toBeInTheDocument();
				});
			});

			describe('quand on reçoit l’information', () => {
				it('affiche le taux', () => {
					render(<StatistiquesFormation statistiques={statistiques()}/>);


					const listeDeStatistique = screen.getByRole('list', { name: 'statistiques' });
					const tauxEnFormation = within(listeDeStatistique).getByText('sont inscrits en formation (formation supérieure, redoublants, changement de filière)');
					expect(tauxEnFormation).toBeVisible();
					const tauxEnFormationPourcentage = within(listeDeStatistique).getByText('22%');
					expect(tauxEnFormationPourcentage).toBeVisible();
				});
			});
		});

		describe('concernant le taux des autres cas', () => {
			describe('quand on ne reçoit pas l’information', () => {
				it('ne retourne rien', () => {
					render(<StatistiquesFormation statistiques={statistiques({ tauxAutres6Mois: undefined })}/>);

					const tauxAutres6Mois = screen.queryByText('sont dans d’autres cas (recherche d’emploi, service civique, à l’étranger, indépendant, etc)');
					expect(tauxAutres6Mois).not.toBeInTheDocument();
				});
			});

			describe('quand on reçoit l’information', () => {
				it('affiche le taux', () => {
					render(<StatistiquesFormation statistiques={statistiques()}/>);


					const listeDeStatistique = screen.getByRole('list', { name: 'statistiques' });
					const tauxAutres6Mois = within(listeDeStatistique).getByText('sont dans d’autres cas (recherche d’emploi, service civique, à l’étranger, indépendant, etc)');
					expect(tauxAutres6Mois).toBeVisible();
					const tauxAutres6MoisPourcentage = within(listeDeStatistique).getByText('12%');
					expect(tauxAutres6MoisPourcentage).toBeVisible();
				});
			});
		});

		describe('concernant le millesime', () => {
			describe('quand on ne reçoit pas l’information', () => {
				it('ne retourne rien', () => {
					render(<StatistiquesFormation statistiques={statistiques({ millesime: undefined })}/>);

					const millesime = screen.queryByText('Données issues du dispositif InserJeunes, promotion)');
					expect(millesime).not.toBeInTheDocument();
				});
			});

			describe('quand on reçoit l’information', () => {
				it('affiche le millesime', () => {
					render(<StatistiquesFormation statistiques={statistiques()}/>);

					const millesime = screen.getByText('Données issues du dispositif InserJeunes, promotion 2020-2021');
					expect(millesime).toBeVisible();
				});
			});
		});

	});

	describe('quand on ne reçoit pas de statistiques', () => {
		it('ne retourne rien', () => {
			render(<StatistiquesFormation statistiques={undefined}/>);

			const entête = screen.queryByRole('heading', { level: 2 });
			expect(entête).not.toBeInTheDocument();

			const listeDeStatistique = screen.queryByRole('list', { name: 'statistiques' });
			expect(listeDeStatistique).not.toBeInTheDocument();
		});
	});
});
