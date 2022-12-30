/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormulaireDeContactEntreprise
	from '~/client/components/features/LesEntreprisesSEngagent/FormulaireDeContactEntreprise';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

describe('FormulaireDeContactEntreprise', () => {
	describe('quand l’utilisateur a rempli le formulaire et que l’api répond un Success', () => {
		it('affiche un message de succès', async () => {
			const aDemandeDeContactService = {
				envoyerPourLeCEJ: jest.fn(),
				envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
			} as unknown as DemandeDeContactService;

			render(
				<DependenciesProvider demandeDeContactService={aDemandeDeContactService}>
					<FormulaireDeContactEntreprise isOpen={true} close={() => false} />
				</DependenciesProvider>,
			);

			await remplirFormulaireDeContact();
			await cliqueBoutonEnvoyerLaDemande();

			await waitFor(async () => {
				expect(aDemandeDeContactService.envoyerPourLesEntreprisesSEngagent).toHaveBeenCalledWith({
					email: 'jean.dupont@gmail.com',
					message: 'super rrr',
					nom: 'Dupont',
					prénom: 'Jean',
					sujet: 'super sujet',
					téléphone: '0611223344',
				});
			});
			expect(await screen.findByText('Votre demande a bien été transmise !')).toBeInTheDocument();
		});
	});
});

const aUser = userEvent.setup({ delay: null });

async function remplirFormulaireDeContact() {
	const prénomInput = screen.getByRole('textbox', { name: 'Prénom' });
	await aUser.type(prénomInput, 'Jean');
	const nomInput = screen.getByRole('textbox', { name: 'Nom' });
	await aUser.type(nomInput, 'Dupont');
	const emailInput = screen.getByRole('textbox', { name: 'Adresse email' });
	await aUser.type(emailInput, 'jean.dupont@gmail.com');
	const téléphoneInput = screen.getByRole('textbox', { name: 'Téléphone' });
	await aUser.type(téléphoneInput, '0611223344');
	const sujetInput = screen.getByRole('textbox', { name: 'Sujet' });
	await aUser.type(sujetInput, 'super sujet');
	const messageInput = screen.getByRole('textbox', { name: 'Message' });
	await aUser.type(messageInput, 'super rrr');

}

async function cliqueBoutonEnvoyerLaDemande() {
	const user = userEvent.setup();
	const submit = await screen.findByRole('button', { name: 'Envoyer la demande' });
	user.click(submit);
}
