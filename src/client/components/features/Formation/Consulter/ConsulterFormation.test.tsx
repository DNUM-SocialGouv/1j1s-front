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
		const formation = aFormation({
			adresse: {
				adresseComplete: '1 rue de la République 75001 Paris',
				codePostal: '75001',
			},
			description: 'Description de la formation',
			dureeIndicative: '1 an',
			nomEntreprise: 'La Bonne Alternance',
			objectif: 'Objectifs de la formation',
			tags: ['Paris'],
			titre: 'Développeur web',
		});

		render(<ConsulterFormation formation={formation}/>);

		const titre = screen.getByRole('heading', { level: 1, name: formation.titre });
		expect(titre).toBeVisible();
		const nomEntreprise = screen.queryByText(formation.nomEntreprise!);
		expect(nomEntreprise).toBeVisible();
		const tags = screen.queryByText(formation.tags[0]);
		expect(tags).toBeVisible();
		const description = screen.queryByText(formation.description!);
		expect(description).toBeVisible();
		const objectif = screen.queryByText(formation.objectif!);
		expect(objectif).toBeVisible();
		const dureeIndicative = screen.queryByText(formation.dureeIndicative!);
		expect(dureeIndicative).toBeVisible();
		const codePostal = screen.queryByText(formation.adresse.codePostal!, { exact: false });
		expect(codePostal).toBeVisible();
		const adresseComplete = screen.queryByText(formation.adresse.adresseComplete!, { exact: false });
		expect(adresseComplete).toBeVisible();
	});
	it('affiche un lien pour envoyer une demande de contact à l’établissement de formation', () => {
		const formation: Formation = aFormation({
			adresse: {
				adresseComplete: '1 rue de la République 75001 Paris',
				codePostal: '75001',
			},
			description: 'Description de la formation',
			lienDemandeRendezVous: 'https://domaine.fr',
			nomEntreprise: 'La Bonne Alternance',
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
				adresseComplete: '1 rue de la République 75001 Paris',
				codePostal: '75001',
			},
			description: 'Description de la formation',
			lienDemandeRendezVous: undefined,
			nomEntreprise: 'La Bonne Alternance',
			objectif: 'Objectifs de la formation',
			tags: ['Paris'],
			titre: 'Développeur web',
		});

		render(<ConsulterFormation formation={formation}/>);

		const link = screen.queryByRole('link', { name: 'Demander un rendez-vous' });
		expect(link).not.toBeInTheDocument();
	});
});
