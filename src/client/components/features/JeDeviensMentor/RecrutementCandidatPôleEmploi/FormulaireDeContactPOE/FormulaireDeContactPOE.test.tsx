/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  FormulairesPoleEmploi,
} from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/FormulaireDeContactPOE/FormulaireDeContactPOE';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { mockUseRouter } from '~/client/useRouter.mock';
import { mockLargeScreen } from '~/client/window.mock';
import JeRecruteAfprPoeiInscription from '~/pages/je-recrute-afpr-poei/inscription/index.page';
import { createSuccess } from '~/server/errors/either';

describe('<JeRecruteAfprPoeiInscription />', () => {

  beforeEach(() => {
    mockLargeScreen();
  });

  const labelsEtape1 = [
    { name: 'Indiquez le nom de l’entreprise' },
    { name: 'Indiquez la ville du siège social de l’entreprise' },
    { name: 'Indiquez votre numéro de SIRET' },
    { name: 'Indiquez le secteur d’activité de votre entreprise' },
    { name: 'Indiquez la taille de votre entreprise' },
  ];

  const labelsEtape2 = [
    { name: 'Indiquez votre prénom' },
    { name: 'Indiquez votre nom' },
    { name: 'Indiquez une adresse e-mail' },
    { name: 'Indiquez votre rôle au sein de l’entreprise' },
    { name: 'Indiquez un numéro de téléphone' },
  ];

  const labelsEtape3 = [
    { name: 'Indiquez le nombre de recrutements AFPR/POE que vous souhaitez' },
    { name: 'Vous avez la possibilité de nous faire part de vos commentaires ou toutes autres informations que vous jugieriez utiles' },
  ];

  const anDemandeDeContactService = (): DemandeDeContactService => ({
    envoyerPourLePOE: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as DemandeDeContactService);
  const demandeDeContactServiceMock = anDemandeDeContactService();
  const localisationService = aLocalisationService();
  
  const routerPush = jest.fn();

  function renderComponent() {
    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactServiceMock}
        localisationService={localisationService}>
        <JeRecruteAfprPoeiInscription/>
      </DependenciesProvider>,
    );
    return { demandeDeContactServiceMock };
  };
  beforeAll(() => {
    mockUseRouter({ push: routerPush });
  });

  describe('quand l’utilisateur arrivent sur la page JeRecruteAfprPoei', () => {
    it('il peut cliquer sur le bouton Retour pour retourner sur la page JeRecruteAfprPoei', async () => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

      expect(routerPush).toHaveBeenCalledWith('/je-recrute-afpr-poei');
    });

    it('il voit afficher la première étape de formulaire', () => {
      renderComponent();

      expect(screen.getByText('Etape 1 sur 3')).toBeInTheDocument();
      labelsEtape1.forEach((label) => {
        expect(screen.getByLabelText(label.name)).toBeInTheDocument();
      });
    });
  });

  describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 1', () => {
    it('il voit des messages d’erreur', async () => {
      renderComponent();

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      await userEvent.type(inputNomSociété, 'Crédit Agricole');

      await directionNouvelleEtape();

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' })).toBeValid();
      expect(screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquez votre numéro de SIRET' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquez le secteur d’activité de votre entreprise' })).toBeInvalid();
    });
  });

  describe('quand l’utilisateur clique sur Suivant et qu’il a rempli tous les champs de l’étape 1', () => {
    it('il passe à l’étape 2', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await directionNouvelleEtape();

      expect(screen.getByText('Etape 2 sur 3')).toBeInTheDocument();
      labelsEtape2.forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInTheDocument();
      });
    });

    describe('puis passe à l’étape 2 et qu’il clique sur Retour', () => {
      it('il repasse à l’étape 1', async () => {
        renderComponent();

        await remplirFormulaireEtape1();
        await directionNouvelleEtape();
        await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

        expect(screen.getByText('Etape 1 sur 3')).toBeInTheDocument();
      });
    });
  });

  describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 2', () => {
    it('il voit des messages d’erreur', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await directionNouvelleEtape();

      const inputNom = screen.getByRole('textbox', { name: 'Indiquez votre prénom' });
      await userEvent.type(inputNom, 'Tata');

      await directionNouvelleEtape();

      expect(screen.getByRole('textbox', { name: 'Indiquez votre prénom' })).toBeValid();
      expect(screen.getByRole('textbox', { name: 'Indiquez votre nom' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquez une adresse e-mail' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquez un numéro de téléphone' })).toBeInvalid();
    });
  });

  describe('quand l’utilisateur clique sur Suivant et qu’il a rempli tous les champs de l’étape 2', () => {
    it('il passe à l’étape 3', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await directionNouvelleEtape();
      await remplirFormulaireEtape2();
      await directionNouvelleEtape();

      labelsEtape3.forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInTheDocument();
      });
      expect(screen.getByText('Etape 3 sur 3')).toBeInTheDocument();
    });

    describe('puis passe à l’étape 3 et qu’il clique sur Retour', () => {
      it('il repasse à l’étape 2', async () => {
        renderComponent();

        await remplirFormulaireEtape1();
        await directionNouvelleEtape();
        await remplirFormulaireEtape2();
        await directionNouvelleEtape();
        await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

        expect(screen.getByText('Etape 2 sur 3')).toBeInTheDocument();
      });
    });
  });

  describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 3', () => {
    it('il enregistre car les champs sont facultatifs', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await directionNouvelleEtape();
      await remplirFormulaireEtape2();
      await directionNouvelleEtape();

      const inputNbRecrutement = screen.getByRole('textbox', { name: 'Indiquez le nombre de recrutements AFPR/POE que vous souhaitez' });
      await userEvent.type(inputNbRecrutement, '4');
      const inputCommentaire = screen.getByRole('textbox', { name: 'Vous avez la possibilité de nous faire part de vos commentaires ou toutes autres informations que vous jugieriez utiles' });
      await userEvent.type(inputCommentaire, 'Coucou le commentaire');

      expect(screen.getByRole('textbox', { name: 'Indiquez le nombre de recrutements AFPR/POE que vous souhaitez' })).toHaveValue('4');
      expect(screen.getByRole('textbox', { name: 'Vous avez la possibilité de nous faire part de vos commentaires ou toutes autres informations que vous jugieriez utiles' })).toHaveValue('Coucou le commentaire');
    });
  });

  describe('quand l’utilisateur a rempli tous les champs et clique sur le bouton Envoyer', () => {
    it('appelle l’api avec les valeurs du formulaire de l’étape 1, 2 et 3 et affiche un message de succès à l’utilisateur', async () => {
      renderComponent();
      const expected: FormulairesPoleEmploi = {
        codePostal: '75015',
        commentaire: '',
        email: 'toto@email.com',
        nom: 'Tata',
        nomSociété: 'Fnac',
        nombreARecruter: '',
        prénom: 'Jean',
        secteur: 'health-social',
        siret: '12345678901112',
        taille: 'xsmall',
        travail: 'RH',
        téléphone: '0122334455',
        ville: 'Paris 15e Arrondissement',
      };

      await remplirFormulaireEtape1();
      await directionNouvelleEtape();
      await remplirFormulaireEtape2();
      await directionNouvelleEtape();
      await userEvent.click(screen.getByRole('button',{ name: 'Envoyer mes informations afin d’être rappelé(e)' }));

      expect(demandeDeContactServiceMock.envoyerPourLePOE).toHaveBeenCalledWith(expected);
      expect(screen.getByText('Félicitations, votre formulaire a bien été envoyé !')).toBeInTheDocument();
    });
  });

});

async function remplirFormulaireEtape1() {
  const user = userEvent.setup();
  const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
  await user.type(inputNomSociété, 'Fnac');
  const inputSiret = screen.getByRole('textbox', { name: 'Indiquez votre numéro de SIRET' });
  await user.type(inputSiret, '12345678901112');
  const inputSecteur = screen.getByRole('textbox', { name: 'Indiquez le secteur d’activité de votre entreprise' });
  await user.type(inputSecteur, 'Santé humaine et action sociale');
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  await waitFor(() => user.click(screen.getByText('Santé humaine et action sociale')));
  await user.click(screen.getByLabelText('Indiquez la taille de votre entreprise'));
  await user.click(screen.getByText('20 à 49 salariés'));
  const inputVille = screen.getByLabelText('Indiquez la ville du siège social de l’entreprise');
  await user.type(inputVille, 'Paris');
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  await waitFor(() => user.click(screen.getByText('Paris 15e Arrondissement')));
}

async function remplirFormulaireEtape2() {
  const inputPrenom = screen.getByRole('textbox', { name: 'Indiquez votre prénom' });
  const inputNom = screen.getByRole('textbox', { name: 'Indiquez votre nom' });
  const inputEmail = screen.getByRole('textbox', { name: 'Indiquez une adresse e-mail' });
  const inputTravail = screen.getByRole('textbox', { name: 'Indiquez votre rôle au sein de l’entreprise' });
  const inputTéléphone = screen.getByRole('textbox', { name: 'Indiquez un numéro de téléphone' });
  await userEvent.type(inputPrenom, 'Jean');
  await userEvent.type(inputNom, 'Tata');
  await userEvent.type(inputTravail, 'RH');
  await userEvent.type(inputEmail, 'toto@email.com');
  await userEvent.type(inputTéléphone, '0122334455');
}

async function directionNouvelleEtape() {
  const button = screen.getByRole('button', { name: 'Suivant' });
  await userEvent.click(button);
}
