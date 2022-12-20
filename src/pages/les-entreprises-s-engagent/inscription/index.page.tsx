import Image from 'next/legacy/image';
import React, { ChangeEvent, Dispatch, FormEvent, useCallback, useMemo, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import FormulaireDeContactEntreprise
  from '~/client/components/features/LesEntreprisesSEngagent/FormulaireDeContactEntreprise';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ButtonAsLink } from '~/client/components/ui/ButtonAsLink/ButtonAsLink';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité, {
  SecteurActivité,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import {
  LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import styles from '~/pages/les-entreprises-s-engagent/inscription/index.module.scss';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

export type FormulaireEngagement = FormulaireÉtape1Props & FormulaireÉtape2Props;

interface FormulaireÉtape1Props {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: string;
  taille: string;
}

interface FormulaireÉtape2Props {
  prénom: string;
  nom: string;
  email: string;
  travail: string;
  téléphone: string;
}

enum Etape {
  ETAPE_1 = 'Etape 1 sur 2',
  ETAPE_2 = 'Etape 2 sur 2'
}

export const TITLE_ÉTAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
export const TITLE_ÉTAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
export const TITLE_VALIDÉE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export default function LesEntreprisesSEngagentInscription() {
  const lesEntreprisesSEngagentService = useDependency<LesEntreprisesSEngagentService>('lesEntreprisesSEngagentService');
  const [title, setTitle] = useState<string>(TITLE_ÉTAPE_1);
  const [étape, setÉtape] = useState<Etape>(Etape.ETAPE_1);
  const [isContactezNousOpen, setIsContactezNousOpen] = useState<boolean>(false);
  const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);

  const [formulaireÉtape1, setFormulaireÉtape1] = useState<FormulaireÉtape1Props>({
    codePostal: '',
    nomSociété: '',
    secteur: '',
    siret: '',
    taille: '',
    ville: '',
  });

  const [formulaireÉtape2, setFormulaireÉtape2] = useState<FormulaireÉtape2Props>({
    email: '',
    nom: '',
    prénom: '',
    travail: '',
    téléphone: '',
  });

  const isPremièreÉtape = useMemo(() => étape === Etape.ETAPE_1, [étape]);
  const isDeuxièmeÉtape = useMemo(() => étape === Etape.ETAPE_2, [étape]);
  const isPremièreÉtapeValid = useMemo(() => Object.values(formulaireÉtape1).every((value) => value.length > 0), [formulaireÉtape1]);
  const isDeuxièmeÉtapeValid = useMemo(() => Object.values(formulaireÉtape2).every((value) => value.length > 0), [formulaireÉtape2]);

  const goToÉtape2 = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitle(TITLE_ÉTAPE_2);
    if (isPremièreÉtape && isPremièreÉtapeValid) {
      setTitle(TITLE_ÉTAPE_2);
      setÉtape(Etape.ETAPE_2);
    }
  }, [isPremièreÉtape, isPremièreÉtapeValid]);

  const returnToÉtape1 = useCallback(() => {
    setTitle(TITLE_ÉTAPE_1);
    setÉtape(Etape.ETAPE_1);
  }, []);

  const submitFormulaire = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPremièreÉtapeValid && isDeuxièmeÉtapeValid) {
      const response = await lesEntreprisesSEngagentService.envoyerFormulaireEngagement({ ...formulaireÉtape1, ...formulaireÉtape2 });

      if (isSuccess(response)) {
        setTitle(TITLE_VALIDÉE);
        setIsFormSuccessfullySent(true);
      }
    }
  }, [isPremièreÉtapeValid, isDeuxièmeÉtapeValid, formulaireÉtape1, formulaireÉtape2, lesEntreprisesSEngagentService]);

  return (
    <main id="contenu">
      <HeadTag
        title={title}
        description="Formulaire d’inscription pour rejoindre la mobilisation “Les Entreprises s’Engagent”"/>
      {
        !isFormSuccessfullySent &&
        <>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Image src="/icons/les-entreprises-s-engagent.svg" alt="" width="144" height="80" aria-hidden="true"/>
            </div>
            <h1 className={styles.titre}>REJOIGNEZ &ldquo;LES ENTREPRISES S‘ENGAGENT&rdquo;</h1>
          </div>
          <div className={styles.content}>
            <div className={styles.etape}>{étape}</div>
            <div className={styles.mandatoryFields}>Tous les champs du formulaire sont obligatoires</div>
            {isPremièreÉtape && (
              <PremièreÉtapeInscription
                onSubmit={goToÉtape2}
                formData={formulaireÉtape1}
                dispatchFormData={setFormulaireÉtape1}
              />
            )}
            {isDeuxièmeÉtape && (
              <>
                <ButtonComponent
                  appearance="secondary"
                  className={styles.boutonRetour}
                  icon={<Icon name="angle-left"/>}
                  iconPosition="left"
                  onClick={returnToÉtape1}
                  label="Retour"
                />
                <form className={styles.formulaire} onSubmit={submitFormulaire}>
                  <div className={styles.bodyFormulaire}>
                    <InputText
                      label="Indiquez votre prénom"
                      name="firstName"
                      placeholder="Exemple : Marc, Sonia…"
                      value={formulaireÉtape2.prénom}
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
                        ...formulaireÉtape2,
                        prénom: event.currentTarget.value,
                      })}
                    />
                    <InputText
                      label="Indiquez votre nom"
                      name="lastName"
                      placeholder="Exemple : Ducourt, Dupont…"
                      value={formulaireÉtape2.nom}
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
                        ...formulaireÉtape2,
                        nom: event.currentTarget.value,
                      })}
                    />
                    <InputText
                      label="Indiquez votre adresse e-mail de contact"
                      type="email"
                      name="email"
                      placeholder="Exemple : mail@exemple.com"
                      hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
                      value={formulaireÉtape2.email}
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
                        ...formulaireÉtape2,
                        email: event.currentTarget.value,
                      })}
                    />
                    <InputText
                      label="Indiquez votre fonction au sein de l’entreprise"
                      name="job"
                      placeholder="Exemple : RH, Chargé de communications"
                      value={formulaireÉtape2.travail}
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
                        ...formulaireÉtape2,
                        travail: event.currentTarget.value,
                      })}
                    />
                    <InputText
                      label="Indiquez un numéro de téléphone de contact"
                      name="phone"
                      placeholder="Exemple : 0199999999"
                      pattern="^(\+33|0|0033)[1-9]\d{8}$"
                      hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
                      value={formulaireÉtape2.téléphone}
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
                        ...formulaireÉtape2,
                        téléphone: event.currentTarget.value,
                      })}
                    />
                  </div>
                  <div className={styles.validationEtape2}>
                    <ButtonComponent
                      icon={<Icon name="angle-right"/>}
                      iconPosition="right"
                      label="Envoyer le formulaire"
                      type="submit"
                    />
                    <DéchargeRGPD/>
                  </div>
                </form>
              </>
            )}
            <p className={styles.footer}>
              Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification,
              <ButtonAsLink onClick={() => setIsContactezNousOpen(true)}>contactez-nous</ButtonAsLink>
            </p>
          </div>
          {
            isContactezNousOpen &&
            <FormulaireDeContactEntreprise isOpen={isContactezNousOpen} close={() => setIsContactezNousOpen(false)}/>
          }
        </>
      }

      {isFormSuccessfullySent &&
        <div className={styles.success}>Félicitations, votre formulaire a bien été envoyé !</div>}
    </main>
  );
}

interface PremièreÉtapeInscriptionProps {
  dispatchFormData: Dispatch<FormulaireÉtape1Props>
  formData: FormulaireÉtape1Props

  onSubmit(event: FormEvent<HTMLFormElement>): void
}

function PremièreÉtapeInscription({ onSubmit, formData, dispatchFormData }: PremièreÉtapeInscriptionProps) {
  const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<Commune>();
  const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

  return (
    <>
      <Link
        appearance="asBackButton"
        className={styles.boutonRetour}
        href="/les-entreprises-s-engagent"
      >
        Retour
      </Link>
      <form className={styles.formulaire} onSubmit={onSubmit}>
        <div className={styles.bodyFormulaire}>
          <InputText
            label="Indiquez le nom de l’entreprise"
            name="companyName"
            placeholder="Exemple : Crédit Agricole, SNCF…"
            value={formData.nomSociété}
            onChange={(event: ChangeEvent<HTMLInputElement>) => dispatchFormData({
              ...formData,
              nomSociété: event.currentTarget.value,
            })}
            required
          />
          <InputAutocomplétionCommune
            required
            id="autocomplete-commune"
            label="Indiquez la ville du siège social de l’entreprise"
            name="companyPostalCode"
            placeholder="Exemple: Paris, Béziers..."
            valeurInitiale={autocomplétionCommuneValeur}
            onSuggestionSelected={(event, suggestion) => {
              setAutocomplétionCommuneValeur(suggestion);
              dispatchFormData({
                ...formData,
                codePostal: suggestion.codePostal,
                ville: suggestion.ville,
              });
            }}
          />
          <InputText
            label="Indiquez votre numéro de SIRET"
            name="companySiret"
            placeholder="Exemple : 12345678901112"
            value={formData.siret}
            required
            pattern={'^[0-9]{14}$'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => dispatchFormData({
              ...formData,
              siret: event.currentTarget.value,
            })}
          />
          <InputAutocomplétionSecteurActivité
            required
            id="autocomplete-secteur-activité"
            label="Indiquez le secteur d’activité de l’entreprise"
            name="companySector"
            placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
            valeurInitiale={secteurActivitéValeur}
            onSuggestionSelected={(event, suggestion) => {
              setSecteurActivitéValeur(suggestion);
              dispatchFormData({
                ...formData,
                secteur: suggestion.valeur,
              });
            }}
          />
          <Select
            required
            label="Indiquez la taille de l’entreprise"
            name="companySize"
            placeholder="Exemple : 250 à 499 salariés"
            optionList={taillesEntreprises}
            onChange={(value: string) => dispatchFormData({
              ...formData,
              taille: value,
            })}
            value={formData.taille}
          />
        </div>

        <div className={styles.validationEtape1}>
          <ButtonComponent
            icon={<Icon name="angle-right"/>}
            iconPosition="right"
            label="Suivant"
            type="submit"
          />
          <DéchargeRGPD/>
        </div>
      </form>
    </>
  );
}

