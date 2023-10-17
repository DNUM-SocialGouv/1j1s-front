/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterFormation } from '~/client/components/features/Formation/Consulter/ConsulterFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { Formation } from '~/server/formations/domain/formation';
import { aFormation } from '~/server/formations/domain/formation.fixture';

describe('ConsulterFormation', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche la formation', async () => {
		const formation = {
			adresse: {
				adresseComplète: '1 rue de la République - 75001 - Paris',
				codePostal: '75001',
			},
			contact: {
				email: 'email@domaine.fr',
				tel: '01 23 45 67 89',
				url: 'https://domaine.fr',
			},
			description: 'Description de la formation',
			duréeIndicative: '1 an',
			nomEntreprise: 'La Bonne Alternance',
			nombreHeuresAuCentre: 100,
			nombreHeuresEnEntreprise: 200,
			objectif: 'Objectifs de la formation',
			tags: ['Paris'],
			titre: 'Développeur web',
		};

		render(<ConsulterFormation formation={formation}/>);

		const titre = screen.getByRole('heading', { level: 1, name: formation.titre });
		expect(titre).toBeVisible();
		const nomEntreprise = screen.queryByText(formation.nomEntreprise);
		expect(nomEntreprise).toBeVisible();
		const tags = screen.queryByText(formation.tags[0]);
		expect(tags).toBeVisible();
		const description = screen.queryByText(formation.description);
		expect(description).toBeVisible();
		const objectif = screen.queryByText(formation.objectif);
		expect(objectif).toBeVisible();
		const nombreHeuresEnEntreprise = screen.queryByText(formation.nombreHeuresEnEntreprise, { exact: false });
		expect(nombreHeuresEnEntreprise).toBeVisible();
		const nombreHeuresAuCentre = screen.queryByText(formation.nombreHeuresAuCentre, { exact: false });
		expect(nombreHeuresAuCentre).toBeVisible();
		const codePostal = screen.queryByText(formation.adresse.codePostal, { exact: false });
		expect(codePostal).toBeVisible();
		const adresseComplète = screen.queryByText(formation.adresse.adresseComplète, { exact: false });
		expect(adresseComplète).toBeVisible();
	});
	it('affiche un lien pour envoyer une demande de contact à l’établissement de formation', () => {
		const formation: Formation = aFormation({
			adresse: {
				adresseComplète: '1 rue de la République 75001 Paris',
				codePostal: '75001',
			},
			description: 'Description de la formation',
			lienDemandeRendezVous: 'https://domaine.fr',
			nomEntreprise: 'La Bonne Alternance',
			nombreHeuresAuCentre: 100,
			nombreHeuresEnEntreprise: 200,
			objectif: 'Objectifs de la formation',
			tags: ['Paris'],
			titre: 'Développeur web',
		});

		render(<ConsulterFormation formation={formation}/>);

		const link = screen.getByRole('link', { name: 'Contacter l’établissement' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', formation.lienDemandeRendezVous);
		expect(link).toHaveAttribute('title', 'Contacter l’établissement - nouvelle fenêtre');
	});
	it('n’affiche pas de bouton pour demander un rendez-vous si le lien n’est pas renseigné', () => {
		const formation: Formation = aFormation({
			adresse: {
				adresseComplète: '1 rue de la République 75001 Paris',
				codePostal: '75001',
			},
			description: 'Description de la formation',
			lienDemandeRendezVous: undefined,
			nomEntreprise: 'La Bonne Alternance',
			nombreHeuresAuCentre: 100,
			nombreHeuresEnEntreprise: 200,
			objectif: 'Objectifs de la formation',
			tags: ['Paris'],
			titre: 'Développeur web',
		});

		render(<ConsulterFormation formation={formation}/>);

		const link = screen.queryByRole('link', { name: 'Demander un rendez-vous' });
		expect(link).not.toBeInTheDocument();
	});
});
