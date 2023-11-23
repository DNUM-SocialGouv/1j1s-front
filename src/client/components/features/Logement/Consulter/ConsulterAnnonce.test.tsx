/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
} from '@testing-library/react';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { LocaleProvider } from '~/client/context/locale.context';
import { anAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

describe('<ConsulterAnnonce />', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockSmallScreen();
		const routerReload = jest.fn();
		mockUseRouter({ reload: routerReload });
	});

	it('affiche le le bouton retour vers la liste des annonces', () => {
		jest.spyOn(Object.getPrototypeOf(sessionStorage), 'getItem').mockReturnValue('/');

		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const boutonRetour = screen.getByRole('button', { name: 'Retour vers la page précédente' });
		expect(boutonRetour).toBeVisible();
	});

	it("affiche le titre de l'annonce", () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);
		const titre = screen.getByRole('heading', {
			level: 1,
		});

		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Super T3 dans le centre de Paris');
	});

	it('affiche le type de logement', () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.type = 'Location';
		annonceDeLogement.typeBien = 'Appartement';

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);
		const type = screen.getByText(/Location - Appartement/i);

		expect(type).toBeVisible();
	});

	it('affiche la date de mise à jour au bon format', () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		render(
			<LocaleProvider value={'fr-FR'}>
				<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>
			</LocaleProvider>);
		const date = screen.getByText(/Annonce mise à jour le/i);

		expect(date).toBeVisible();
		expect(date).toHaveTextContent(/Annonce mise à jour le 1 février 2020/i);
	});
	it('affiche la date de mise à jour au bon format dépendamment de la locale', () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		render(
			<LocaleProvider value={'en-US'}>
				<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>
			</LocaleProvider>);
		const date = screen.getByText(/Annonce mise à jour le/i);

		expect(date).toBeVisible();
		expect(date).toHaveTextContent(/Annonce mise à jour le February 1, 2020/i);
	});
	it("ajoute l'attribut lang à la date", () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		render(
			<LocaleProvider value={'fr-FR'}>
				<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>
			</LocaleProvider>);
		const date = screen.getByText(/1 février 2020/i);

		expect(date).toHaveAttribute('lang', 'fr-FR');
	});

	describe('carousel', () => {
		let annonceDeLogement = anAnnonceDeLogement();
		beforeEach(() => {
			annonceDeLogement = anAnnonceDeLogement();
		});

		it('affiche correctement le carousel', () => {
			annonceDeLogement.imageList = [{ alt: '', src: '/une-première-image.webp' }, {
				alt: '',
				src: '/une-deuxième-image.webp',
			}];
			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);

			const carousel = screen.getByText((content, element) => element?.getAttribute('aria-roledescription') === 'carousel');
			expect(carousel).toBeVisible();
			expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
			expect(carousel).not.toHaveAttribute('aria-hidden');
		});

		describe('quand il n‘y a pas d‘image a afficher', () => {
			it('n‘affiche pas le carousel', () => {
				annonceDeLogement.imageList = [];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);
				const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
				expect(listDeSlides).not.toBeInTheDocument();
			});
		});

		describe('quand il y a une seule image a afficher', () => {
			it('n‘affiche pas le carousel, juste une image', () => {
				annonceDeLogement.imageList = [{ alt: 'une seule image', src: '/une-seule-image.webp' }];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);

				const listDeSlides = screen.queryByRole('list', { name: 'liste des photos' });
				expect(listDeSlides).not.toBeInTheDocument();

				const image = screen.getByRole('img', { name: 'une seule image' });
				expect(image).toHaveAttribute('src', expect.stringMatching(/une-seule-image.webp/));
			});
		});

		describe('quand il y a plusieurs images a afficher', () => {
			it('affiche le carousel', () => {
				annonceDeLogement.imageList = [{ alt: '', src: '/une-première-image.webp' }, {
					alt: '',
					src: '/une-deuxième-image.webp',
				}];
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);

				const listDesSlides = screen.getByText((content, element) => element?.getAttribute('aria-live') === 'polite');
				expect(listDesSlides).toBeVisible();
			});
		});
	});
	it('affiche la description du logement', () => {
		const annonceDeLogement = anAnnonceDeLogement();
		annonceDeLogement.description = "C'est un super logement !";

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>);
		const description = screen.getByText(/C'est un super logement !/i);

		expect(description).toBeVisible();
	});
	it('affiche les informations générales', () => {
		const annonceDeLogement = anAnnonceDeLogement();

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const section = screen.getByRole('region', { name: /Informations Générales/i });

		expect(section).toBeVisible();
	});

	describe('bilan énergétique du logement', ()=>{
		it('affiche la consommation énergétique du logement',  () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const consommationEnergetique = screen.getByRole('img', { name: /A/i });

			expect(consommationEnergetique).toBeVisible();
		});
		it('affiche le libellé de la consommation énergétique du logement',  () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /A/i });
			const description = screen.getByText(/Excellente performance énergétique/i);

			expect(tag).toHaveAttribute('aria-describedby', description.id);
		});
		it('affiche la couleur de la consommation énergétique du logement',  () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.consommationEnergetique = 'A';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /A/i });

			expect(tag).toHaveAttribute('style', '--color: var(--color-a); --text-color: var(--text-color-a);');
		});
		it('affiche l’émission de gaz du logement',  ()=>{
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const emissionDeGaz = screen.getByRole('img', { name: /G/i });

			expect(emissionDeGaz).toBeVisible();
		});
		it('affiche le libellé de l’émission de gaz du logement',  () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /G/i });

			expect(tag).toHaveAccessibleDescription(/Très importante émission de gaz à effet de serre/i);
		});
		it('affiche la couleur de l’émission de gaz du logement',  () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const tag = screen.getByRole('img', { name: /G/i });

			expect(tag).toHaveAttribute('style', '--color: var(--color-g); --text-color: var(--text-color-g);');
		});
		it('affiche le titre pour les émissions de gaz à effet de serre', async () => {
			const annonceDeLogement = anAnnonceDeLogement();
			annonceDeLogement.bilanEnergetique.emissionDeGaz = 'G';

			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);

			// NOTE (GAFI 06-02-2023): nécessaire puisque texte splitté dans plusieurs balises
			const titre = screen.getByText((content, element) => element?.textContent === 'Émissions de GES');
			expect(titre).toBeVisible();
			const abréviation = screen.getByText('GES');
			expect(abréviation).toHaveAttribute('title', 'Gaz à Effet de Serre');
		});
	});

	describe('source', () => {
		describe('quand la source est immojeune', () => {
			it('retourne le logo immojeune',  () => {
				const annonceDeLogement = anAnnonceDeLogement();
				annonceDeLogement.source = 'immojeune' as AnnonceDeLogement.Source;
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
				const diffuseur = screen.getByText('Ce bien est diffusé par');
				expect(diffuseur).toBeVisible();

				const logoDiffuseur = screen.getByRole('img', { name: 'immojeune' });
				expect(logoDiffuseur).toBeVisible();
			});
		});

		describe('quand la source est studapart', () => {
			it('retourne le logo studapart',  () => {
				const annonceDeLogement = anAnnonceDeLogement();
				annonceDeLogement.source = 'studapart' as AnnonceDeLogement.Source;
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
				const diffuseur = screen.getByText('Ce bien est diffusé par');
				expect(diffuseur).toBeVisible();

				const logoDiffuseur = screen.getByRole('img', { name: 'studapart' });
				expect(logoDiffuseur).toBeVisible();
			});
		});

		describe('quand la source est inconnu', () => {
			it('retourne rien', () => {
				const annonceDeLogement = anAnnonceDeLogement();
				annonceDeLogement.source = 'seLoger' as AnnonceDeLogement.Source;
				render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
				const diffuseur = screen.queryByText('Ce bien est diffusé par');
				expect(diffuseur).not.toBeInTheDocument();
				expect(diffuseur).toBeNull();

			});
		});
	});

	describe('call to action Voir l‘annonce', () => {
		it('affiche un lien externe Voir l‘annonce', () => {
			const annonceDeLogement = anAnnonceDeLogement();
			render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const lienExterneCandidater = screen.getByRole('link', { name: 'Voir l‘annonce' });
			expect(lienExterneCandidater).toBeVisible();
			expect(lienExterneCandidater).toHaveAttribute('href', 'lien-immo-jeune.com');
			expect(lienExterneCandidater).toHaveAttribute('title', 'Voir l‘annonce - nouvelle fenêtre');
		});
	});
	it('affiche les services', () => {
		const annonceDeLogement = anAnnonceDeLogement();

		render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const section = screen.getByRole('region', { name: /Équipements et services/i });

		expect(section).toBeVisible();
	});
});
