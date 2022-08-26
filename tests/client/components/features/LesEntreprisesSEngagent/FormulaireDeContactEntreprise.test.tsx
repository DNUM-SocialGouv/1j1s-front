/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormulaireDeContactEntreprise
  from '~/client/components/features/LesEntreprisesSEngagent/FormulaireDeContactEntreprise';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
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

      expect(aDemandeDeContactService.envoyerPourLesEntreprisesSEngagent).toHaveBeenCalledWith({
        email: 'jean.dupont@gmail.com',
        message: 'super rrr',
        nom: 'Dupont',
        prénom: 'Jean',
        sujet: 'super sujet',
        téléphone: '0611223344',
      });
      expect(await screen.findByText('Votre demande a bien été transmise !')).toBeInTheDocument();
    });
  });
});

const aUser = userEvent.setup();

async function remplirFormulaireDeContact() {
  const prénomInput = screen.getByRole('textbox', { name: 'Prénom' });
  const nomInput = screen.getByRole('textbox', { name: 'Nom' });
  const emailInput = screen.getByRole('textbox', { name: 'Adresse email' });
  const téléphoneInput = screen.getByRole('textbox', { name: 'Téléphone' });
  const sujetInput = screen.getByRole('textbox', { name: 'Sujet' });
  const messageInput = screen.getByRole('textbox', { name: 'Message' });

  await aUser.type(prénomInput, 'Jean');
  await aUser.type(nomInput, 'Dupont');
  await aUser.type(emailInput, 'jean.dupont@gmail.com');
  await aUser.type(téléphoneInput, '0611223344');
  await aUser.type(sujetInput, 'super sujet');
  await aUser.type(messageInput, 'super rrr');
}

async function cliqueBoutonEnvoyerLaDemande() {
  fireEvent.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
}
