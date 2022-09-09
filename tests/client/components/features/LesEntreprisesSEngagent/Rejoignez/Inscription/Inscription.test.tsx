/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { aLesEntreprisesSEngagementService } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';

import { FormulaireEngagement } from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/Inscription/Inscription';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import LesEntreprisesSEngagentInscription from '~/pages/les-entreprises-s-engagent/inscription';

describe('LesEntreprisesSEngagentInscription', () => {
  const aLesEntreprisesSEngagementServiceMock = aLesEntreprisesSEngagementService();
  const localisationService = aLocalisationService({
    communeList: [{ code: '75001', libelle: 'Paris (75001)', nom: 'Paris' }],
    départementList: [],
    régionList: [],
  });

  const routerPush = jest.fn();

  const labelsEtape1 = [
    { name: 'Indiquez le nom de l’entreprise' },
    { name: 'Indiquez la ville du siège social de l’entreprise' },
    { name: 'Indiquer votre numéro de SIRET' },
    { name: 'Indiquer le secteur d’activité de votre entreprise' },
    { name: 'Indiquer la taille de votre entreprise' },
  ];

  const labelsEtape2 = [
    { name: 'Indiquer votre prénom' },
    { name: 'Indiquer votre nom' },
    { name: 'Indiquer votre adresse e-mail de contact' },
    { name: 'Indiquer votre fonction au sein de votre entreprise' },
    { name: 'Indiquer un numéro de téléphone de contact' },
  ];

  const renderComponent = () => {
    render(
      <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock} localisationService={localisationService}>
        <LesEntreprisesSEngagentInscription/>
      </DependenciesProvider>,
    );
  };

  beforeAll(() => {
    mockUseRouter({ push: routerPush });
  });

  describe('quand l’utilisateur arrivent sur la page', () => {
    it('il peut cliquer sur le bouton Retour pour retourner sur la page de description des entreprises s’engagent', async () => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

      expect(routerPush).toHaveBeenCalledWith('/les-entreprises-s-engagent');
    });

    it('il voit afficher la première étape de formulaire', () => {
      renderComponent();

      expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
      labelsEtape1.forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInTheDocument();
      });
    });
  });

  describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli le formulaire', () => {
    it('il voit des messages d’erreur', async () => {
      renderComponent();

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      await userEvent.type(inputNomSociété, 'Octo');

      await clickOnGoToEtape2();

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' })).toBeValid();
      labelsEtape1.splice(1, 5).forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInvalid();
      });
    });
  });

  describe('quand l’utilisateur clique sur Suivant et qu’il a rempli tous les champs', () => {
    it('il passe à l’étape 2', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await clickOnGoToEtape2();

      expect(screen.getByText('Etape 2 sur 2')).toBeInTheDocument();
      labelsEtape2.forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInTheDocument();
      });
    });

    describe('puis passe à l’étape 2 et qu’il clique sur Retour', () => {
      it('il repasse à l’étape 1', async () => {
        renderComponent();

        await remplirFormulaireEtape1();
        await clickOnGoToEtape2();
        await userEvent.click(screen.getByRole('button', { name: 'Retour' }));

        expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
      });
    });
  });

  describe('quand l’utilisateur a mal rempli l’étape 2 du formulaire et clique sur Envoyer le formulaire', () => {
    it('il voit des messages d’erreur', async () => {
      renderComponent();

      await remplirFormulaireEtape1();
      await clickOnGoToEtape2();

      const inputPrénom = screen.getByRole('textbox', { name: 'Indiquer votre prénom' });
      await userEvent.type(inputPrénom, 'Toto');

      await clickOnEnvoyerLeFormulaire();

      expect(screen.getByRole('textbox', { name: 'Indiquer votre prénom' })).toBeValid();
      labelsEtape1.splice(1, 5).forEach((label) => {
        expect(screen.getByRole('textbox', label)).toBeInvalid();
      });
    });
  });

  describe('quand l’utilisateur a rempli tous les champs et clique sur Envoyer le formulaire', () => {
    it('appelle l’api avec les valeurs du formulaire de l’étape 1 et 2 et affiche un message de succès à l’utilisateur', async () => {
      renderComponent();
      const expected: FormulaireEngagement = {
        codePostal: '75001',
        email: 'toto@email.com',
        nom: 'Tata',
        nomSociété: 'Octo',
        prénom: 'Toto',
        secteur: 'Conseil en systèmes et logiciels informatiques',
        siret: '41816609600069',
        taille: '+1000',
        travail: 'RH',
        téléphone: '01 22 33 44 55',
        ville: 'Paris',
      };

      await remplirFormulaireEtape1();
      await clickOnGoToEtape2();

      await remplirFormulaireEtape2();
      await clickOnEnvoyerLeFormulaire();

      expect(aLesEntreprisesSEngagementServiceMock.envoyerFormulaireEngagement).toHaveBeenCalledWith(expected);
      expect(screen.getByText('Félicitations, votre formulaire a bien été envoyé !')).toBeInTheDocument();
    });
  });
});

async function remplirFormulaireEtape1() {
  const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
  const inputSiret = screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' });
  const inputSecteur = screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' });
  const inputTaille = screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' });
  await userEvent.type(inputNomSociété, 'Octo');
  await userEvent.type(inputSiret, '41816609600069');
  await userEvent.type(inputSecteur, 'Conseil en systèmes et logiciels informatiques');
  await userEvent.type(inputTaille, '+1000');

  await userEvent.type(screen.getByLabelText('Indiquez la ville du siège social de l’entreprise'), 'Paris');
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  await waitFor(() => userEvent.click(screen.getByText('Paris (75001)')));
}

async function remplirFormulaireEtape2() {
  const inputPrénom = screen.getByRole('textbox', { name: 'Indiquer votre prénom' });
  const inputNom = screen.getByRole('textbox', { name: 'Indiquer votre nom' });
  const inputEmail = screen.getByRole('textbox', { name: 'Indiquer votre adresse e-mail de contact' });
  const inputTravail = screen.getByRole('textbox', { name: 'Indiquer votre fonction au sein de votre entreprise' });
  const inputTéléphone = screen.getByRole('textbox', { name: 'Indiquer un numéro de téléphone de contact' });
  await userEvent.type(inputPrénom, 'Toto');
  await userEvent.type(inputNom, 'Tata');
  await userEvent.type(inputEmail, 'toto@email.com');
  await userEvent.type(inputTravail, 'RH');
  await userEvent.type(inputTéléphone, '01 22 33 44 55');
}

async function clickOnGoToEtape2() {
  const button = screen.getByRole('button', { name: 'Suivant' });
  await userEvent.click(button);
}

async function clickOnEnvoyerLeFormulaire() {
  const button = screen.getByRole('button', { name: 'Envoyer le formulaire' });
  await userEvent.click(button);
}

