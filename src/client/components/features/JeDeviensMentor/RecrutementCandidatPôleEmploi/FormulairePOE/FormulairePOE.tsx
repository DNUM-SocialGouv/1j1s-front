import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';

import styles from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/FormulairePOE/FormulairePOE.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité
, { SecteurActivité } from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import {
  CommuneLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export type FormulaireEngagement = FormulaireEtape1Props;

interface FormulaireEtape1Props {
  siret: string;
  nomSociété: string;
  codePostal: string;
  ville: string;
  secteur: string;
  taille: string;
}

export enum Etape {
  ETAPE_1 = 'Etape 1 sur 3',
  ETAPE_2 = 'Etape 2 sur 3',
}

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export function FormulairePOE() {
  const router = useRouter();

  const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<CommuneLocalisationApiResponse>();
  const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

  const [formulaireEtape1, setFormulaireEtape1] = useState<FormulaireEtape1Props>({
    codePostal: '',
    nomSociété: '',
    secteur: '',
    siret: '',
    taille: '',
    ville: '',
  });


  function returnToRejoindreMobilisationPOE() {
    return router.push('/rejoindre-mobilisation-poe');
  }

  function Mention(){
    return (
      <p>Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les transférer à Pôle Emploi.
        Pour en savoir plus vous pouvez consulter la <a href={'/confidentialite'}>politique de confidentialité</a> et les <a href={'/cgu'}>CGU</a> de la DGEFP
      </p>
    );
  }

  return (
    <>
      <HeadTag
        title="Je forme les jeunes grâce à l'emploi"
        description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
      />
      <Hero>
        <p><b>Vous avez besoin d’accompagnement pour bénéficier d’une aide à la formation avant l’embauche</b></p>
        <p className={styles.heroSubtitle}>Remplissez le formulaire ci-dessous et un conseiller Pôle Emploi prendra contact avec vous rapidement</p>
      </Hero>

      <div className={styles.content}>
        <div className={styles.mandatoryFields}>Tous les champs du formulaire sont obligatoires</div>
        <div>
          <button className={styles.boutonRetour} onClick={returnToRejoindreMobilisationPOE}>
            <AngleLeftIcon className={styles.iconeRetour}/> Retour
          </button>
        </div>

        <form className={styles.formulaire}>
          <div className={styles.bodyFormulaire}>
            <InputText
              label="Indiquez votre numéro de SIRET"
              name="companySiret"
              placeholder="Exemple : 12345678901112"
              value={formulaireEtape1.siret}
              required
              pattern={'^[0-9]{14}$'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                ...formulaireEtape1,
                siret: event.currentTarget.value,
              })}
              className={styles.formulaireInput}
            />
            <InputText
              label="Indiquez le nom de l’entreprise"
              name="companyName"
              placeholder="Exemple : Crédit Agricole, SNCF…"
              value={formulaireEtape1.nomSociété}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                ...formulaireEtape1,
                nomSociété: event.currentTarget.value,
              })}
              required
              className={styles.formulaireInput}
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
                setFormulaireEtape1({
                  ...formulaireEtape1,
                  codePostal: suggestion.codePostal,
                  ville: suggestion.nom,
                });
              }}
            />
            <InputAutocomplétionSecteurActivité
              required
              id="autocomplete-secteur-activité"
              label="Indiquez le secteur d’activité de votre entreprise"
              name="companySector"
              placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
              valeurInitiale={secteurActivitéValeur}
              onSuggestionSelected={(event, suggestion) => {
                setSecteurActivitéValeur(suggestion);
                setFormulaireEtape1({
                  ...formulaireEtape1,
                  secteur: suggestion.valeur,
                });
              }}
            />
            <Select
              required
              label="Indiquez la taille de votre entreprise"
              name="companySize"
              placeholder="Exemple : 250 à 499 salariés"
              optionList={taillesEntreprises}
              onChange={(value: string) => setFormulaireEtape1({
                ...formulaireEtape1,
                taille: value,
              })}
              value={formulaireEtape1.taille}
            />
          </div>

          <div className={styles.validationEtape1}>
            <ButtonComponent icon={<Icon name='angle-right' />} iconPosition='right' label='Suivant' type='submit' />
            {Mention()}
          </div>
        </form>
      </div>
    </>
  );
}
