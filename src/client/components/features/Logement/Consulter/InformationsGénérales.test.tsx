/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { InformationsGénérales } from '~/client/components/features/Logement/Consulter/InformationsGénérales';
import { LocaleProvider } from '~/client/context/locale.context';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<InformationsGénérales />', () => {
	describe('Prix', () => {
		it('affiche le prix', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.prix = 500;
			render(<InformationsGénérales annonce={annonce} />);

			const prixRow = screen.getByRole('row', { name: /Prix/i });
			expect(prixRow).toHaveTextContent(/500 €CC\/mois/i);
			const abbreviation = screen.getByText(/CC/i);
			expect(abbreviation).toHaveAttribute('title', 'Charges Comprises');
		});
		it('affiche la bonne devise dans le prix', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.devise = '$';
			render(<InformationsGénérales annonce={annonce} />);

			const prixRow = screen.getByRole('row', { name: /Prix/i });
			expect(prixRow).toHaveTextContent(/\$/i);
		});
		it('affiche les charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.charge = 500;
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.getByRole('row', { name: /Charges/i });
			expect(chargesRow).toHaveTextContent(/500 €/i);
		});
		it('masque la ligne quand pas de charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.charge = undefined;
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.queryByRole('row', { name: /Charges/i });
			expect(chargesRow).not.toBeInTheDocument();
		});
		it('affiche la bonne devise dans les charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.devise = '$';
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.getByRole('row', { name: /Charges/i });
			expect(chargesRow).toHaveTextContent(/\$/i);
		});
		it('affiche la caution', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.garantie = 500;
			render(<InformationsGénérales annonce={annonce} />);

			const cautionRow = screen.getByRole('row', { name: /Caution/i });
			expect(cautionRow).toHaveTextContent(/500 €/i);
		});
		it('masque la ligne quand pas de caution', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.garantie = undefined;
			render(<InformationsGénérales annonce={annonce} />);

			const cautionRow = screen.queryByRole('row', { name: /Caution/i });
			expect(cautionRow).not.toBeInTheDocument();
		});
		it('affiche la bonne devise dans la caution', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.devise = '$';
			render(<InformationsGénérales annonce={annonce} />);

			const cautionRow = screen.getByRole('row', { name: /Caution/i });
			expect(cautionRow).toHaveTextContent(/\$/i);
		});
	});
	describe('Informations du logement', () => {
		describe('concernant la surface', () => {
			describe('quand la surfaceMax est renseignée', () => {
				it('affiche la fourchette de surface', () => {
					const annonce = uneAnnonceDeLogement();
					annonce.surface = 50;
					annonce.surfaceMax = 100;
					render(<InformationsGénérales annonce={annonce} />);

					const surfaceRow = screen.getByRole('row', { name: /Surface/i });
					expect(surfaceRow).toHaveTextContent(/50 à 100 m2/i);
				});
			});
			describe('quand la surfaceMax vaut zéro', () => {
				it('affiche la surface', async () => {
					const annonce = uneAnnonceDeLogement();
					annonce.surface = 50;
					annonce.surfaceMax = 0;
					render(<InformationsGénérales annonce={annonce} />);

					const surfaceRow = screen.getByRole('row', { name: /Surface/i });
					expect(surfaceRow).toHaveTextContent(/50m2/i);
				});
			});
			describe('quand la surfaceMax vaut undefined', () => {
				it('affiche la surface', async () => {
					const annonce = uneAnnonceDeLogement();
					annonce.surface = 50;
					annonce.surfaceMax = undefined;
					render(<InformationsGénérales annonce={annonce} />);

					const surfaceRow = screen.getByRole('row', { name: /Surface/i });
					expect(surfaceRow).toHaveTextContent(/50m2/i);
				});
			});

		});
		it('affiche le nombre de pièces', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.nombreDePièces = 2;
			render(<InformationsGénérales annonce={annonce} />);

			const piècesRow = screen.getByRole('row', { name: /Nombre de pièces/i });
			expect(piècesRow).toHaveTextContent(/2/i);
		});
		it("affiche l'étage", async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.étage = 2;
			render(<InformationsGénérales annonce={annonce} />);

			const étageRow = screen.getByRole('row', { name: /Étage/i });
			expect(étageRow).toHaveTextContent(/2ème/i);
		});
		it('affiche "Rez-de-chaussée" quand l\'étage est 0', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.étage = 0;
			render(<InformationsGénérales annonce={annonce} />);

			const étageRow = screen.getByRole('row', { name: /Étage/i });
			expect(étageRow).toHaveTextContent(/Rez-de-chaussée/i);
		});
		it('affiche "1er" quand l\'étage est 1', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.étage = 1;
			render(<InformationsGénérales annonce={annonce} />);

			const étageRow = screen.getByRole('row', { name: /Étage/i });
			expect(étageRow).toHaveTextContent(/1er/i);
		});
		it("masque la ligne quand pas d'étage", async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.étage = undefined;
			render(<InformationsGénérales annonce={annonce} />);

			const étageRow = screen.queryByRole('row', { name: /Étage/i });
			expect(étageRow).not.toBeInTheDocument();
		});
		it('affiche le type de bien', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.typeBien = 'Appartement';
			render(<InformationsGénérales annonce={annonce} />);

			const typeBienRow = screen.getByRole('row', { name: /Type de bien/i });
			expect(typeBienRow).toHaveTextContent(/Appartement/i);
		});
		it('affiche "Non" si le logement n\'est pas meublé', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.meublé = false;
			render(<InformationsGénérales annonce={annonce} />);

			const meubléRow = screen.getByRole('row', { name: /Meublé/i });
			expect(meubléRow).toHaveTextContent(/Non/i);
		});
		it('affiche "Oui" si le logement est meublé', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.meublé = true;
			render(<InformationsGénérales annonce={annonce} />);

			const meubléRow = screen.getByRole('row', { name: /Meublé/i });
			expect(meubléRow).toHaveTextContent(/Oui/i);
		});
	});
	describe('Localisation', () => {
		it('affiche la localisation formattée', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.localisation = {
				adresse: "15 rue de l'impasse",
				codePostal: '75001',
				ville: 'Paris',
			};
			render(<InformationsGénérales annonce={annonce} />);

			const localisationRow = screen.getByRole('row', { name: /Localisation/i });
			expect(localisationRow).toHaveTextContent(/15 rue de l'impasse, Paris \(75001\)/i);
		});
		it('masque la localisation quand aucune information affichable', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.localisation = {
				adresse: undefined,
				codePostal: undefined,
				ville: undefined,
			};
			render(<InformationsGénérales annonce={annonce} />);

			const localisationRow = screen.queryByRole('row', { name: /Localisation/i });
			expect(localisationRow).not.toBeInTheDocument();
		});
	});
	describe('Disponibilité', () => {
		it('affiche la date de disponibilité', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.dateDeDisponibilité = new Date(2022, 1, 1).toISOString();
			render(
				<LocaleProvider value="fr-FR">
					<InformationsGénérales annonce={annonce}/>
				</LocaleProvider>,
			);

			const disponibilitéRow = screen.getByRole('row', { name: /Disponible/i });
			expect(disponibilitéRow).toHaveTextContent(/le 1 février 2022/i);
		});
		it('affiche la date de disponibilité dépendamment de la locale', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.dateDeDisponibilité = new Date(2022, 1, 1).toISOString();
			render(
				<LocaleProvider value="en-US">
					<InformationsGénérales annonce={annonce}/>
				</LocaleProvider>,
			);

			const disponibilitéRow = screen.getByRole('row', { name: /Disponible/i });
			expect(disponibilitéRow).toHaveTextContent(/le February 1, 2022/i);
		});
		it("ajoute l'attribut lang à la date", async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.dateDeDisponibilité = new Date(2022, 1, 1).toISOString();
			render(
				<LocaleProvider value="fr-FR">
					<InformationsGénérales annonce={annonce}/>
				</LocaleProvider>,
			);

			const date = screen.getByText(/1 février 2022/i);
			expect(date).toHaveAttribute('lang', 'fr-FR');
		});
	});
});
