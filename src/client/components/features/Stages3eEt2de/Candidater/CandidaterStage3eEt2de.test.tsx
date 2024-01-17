/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CandidaterStage3eEt2de from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

describe('Candidater à un stage de 3e et 2de', () => {
	it('affiche un titre avec le nom de l’entreprise', () => {
		// GIVEN

		// WHEN
		render(<CandidaterStage3eEt2de
			appellations={[
				{
					code: 'code',
					label: 'label',
				},
			]}
			modeDeContact={ ModeDeContact.IN_PERSON}
			nomEntreprise="Carrefour"
			siret="37000000000000"
		/>);

		// THEN
		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Je candidate à l’offre de stage de 3e et 2de de l’entreprise Carrefour');
	});
	it('affiche un texte explicatif du process de candidature', () => {
		// GIVEN

		// WHEN
		render(<CandidaterStage3eEt2de
			appellations={[
				{
					code: 'code',
					label: 'label',
				},
			]}
			modeDeContact={ModeDeContact.IN_PERSON}
			nomEntreprise="Carrefour"
			siret="37000000000000"
		/>);

		// THEN
		const explicationPart1 = screen.getByText('Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.');
		const explicationPart2 = screen.getByText('Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne peuvent pas être communiquées à d’autres personnes.');
		expect(explicationPart1).toBeVisible();
		expect(explicationPart2).toBeVisible();
	});

	it('affiche un bouton de retour à la recherche', async () => {
		// GIVEN
		const routerBack = jest.fn();
		mockUseRouter({ back: routerBack });
		// todo: mock sesssion storage fonctionne paaaas c'est la merde DORO ne veut pas l'écrire dans le test mais dans le code ça marche :(
		const user = userEvent.setup();

		// WHEN
		render(<CandidaterStage3eEt2de
			appellations={[
				{
					code: 'code',
					label: 'label',
				},
			]}
			modeDeContact={ModeDeContact.IN_PERSON}
			nomEntreprise="Carrefour"
			siret="37000000000000"
		/>);
		const boutonRetour = screen.getByRole('button', { name: 'Retour à la recherche' });
		await user.click(boutonRetour);

		// THEN
		expect(boutonRetour).toBeVisible();
		expect(routerBack).toHaveBeenCalled();
	});

	it('affiche un formulaire de candidature', () => {
		// GIVEN

		// WHEN
		render(<CandidaterStage3eEt2de
			appellations={[
				{
					code: 'code',
					label: 'label',
				},
			]}
			modeDeContact={ModeDeContact.IN_PERSON}
			nomEntreprise="Carrefour"
			siret="37000000000000"
		/>);

		// THEN
		const formulaire = screen.getByRole('form');
		expect(formulaire).toBeVisible();
	});
});
