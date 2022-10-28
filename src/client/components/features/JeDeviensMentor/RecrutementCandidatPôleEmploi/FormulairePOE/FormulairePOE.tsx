import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import styles from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/FormulairePOE/FormulairePOE.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité
, { SecteurActivité } from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';


export enum Etape {
  ETAPE_1 = 'Etape 1 sur 3',
  ETAPE_2 = 'Etape 2 sur 3',
  ETAPE_3 = 'Etape 3 sur 3',

}

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export function FormulairePOE() {
  const router = useRouter();
  const [etape, setEtape] = useState<Etape>(Etape.ETAPE_1);


  const isPremièreEtape = () => etape === Etape.ETAPE_1;
  const isDeuxièmeEtape = () => etape === Etape.ETAPE_2;
  const isTroisièmeEtape = () => etape === Etape.ETAPE_3;

  const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<Commune>();
  const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

  function redirectionEtape2(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return isPremièreEtape() && setEtape(Etape.ETAPE_2);
  }

  function redirectionEtape3(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return isDeuxièmeEtape() && setEtape(Etape.ETAPE_3);
  }

  function redirectionRejoindreMobilisationPOE() {
    return router.push('/rejoindre-mobilisation-poe');
  }

  function retourEtape1() {
    return setEtape(Etape.ETAPE_1);
  }

  function retourEtape2() {
    return setEtape(Etape.ETAPE_2);
  }

  function Mention(){
    return (
      <p>Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les transférer à Pôle Emploi.
        Pour en savoir plus vous pouvez consulter la <Link href={'/confidentialite'}>politique de confidentialité</Link> et les <Link href={'/cgu'}>CGU</Link> de la DGEFP
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
        <Container className={styles.container}>
          <div className={styles.etape}>{etape}</div>
          <div>
            {
              isPremièreEtape() &&
            <>
              <button className={styles.boutonRetour} onClick={redirectionRejoindreMobilisationPOE}>
                <AngleLeftIcon className={styles.iconeRetour}/> Retour
              </button>
              <div className={styles.champsObligatoires}>
                <p>Etape 1 : Votre entreprise</p>
                <p>Tous les champs du formulaire sont obligatoires</p>
              </div>
            </>
            }
          </div>

          {
            isPremièreEtape() && <form className={styles.formulaire} onSubmit={redirectionEtape2}>

              <div className={styles.bodyFormulaire}>
                <InputText
                  label="Indiquez le nom de l’entreprise"
                  name="companyName"
                  placeholder="Exemple : Crédit Agricole, SNCF…"
                  required
                  className={styles.formulaireInput}
                />
                <InputAutocomplétionCommune
                  required
                  id="autocomplete-commune"
                  label="Indiquez la ville du siège social de l’entreprise"
                  name="companyPostalCode"
                  placeholder="Exemple : Paris, Marseille..."
                  valeurInitiale={autocomplétionCommuneValeur}
                  onSuggestionSelected={(event, suggestion) => {
                    setAutocomplétionCommuneValeur(suggestion);
                  }}
                />
                <InputText
                  label="Indiquez votre numéro de SIRET"
                  name="companySiret"
                  placeholder="Exemple : 12345678901112"
                  required
                  pattern={'^[0-9]{14}$'}
                  className={styles.formulaireInput}
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
                  }}
                />
                <Select
                  required
                  label="Indiquez la taille de votre entreprise"
                  name="companySize"
                  placeholder="Exemple : 500 à 999 salariés"
                  optionList={taillesEntreprises}
                />
              </div>

              <div className={styles.validation}>
                <ButtonComponent icon={<Icon name='angle-right'/>} iconPosition='right' label='Suivant' type='submit'/>
                {Mention()}
              </div>
            </form>
          }

          {
            isDeuxièmeEtape() &&
          <div>
            <button className={styles.boutonRetour} onClick={retourEtape1}>
              <AngleLeftIcon className={styles.iconeRetour}/> Retour
            </button>
            <div className={styles.champsObligatoires}>
              <p>Etape 2 : Vos informations personnelles</p>
              <p>Tous les champs du formulaire sont obligatoires</p>
            </div>
          </div>
          }

          {
            isDeuxièmeEtape() && <form className={styles.formulaire} onSubmit={redirectionEtape3}>
              <div className={styles.bodyFormulaire}>
                <InputText
                  label="Indiquez votre nom"
                  name="lastName"
                  placeholder="Exemple : Dupont"
                  required
                  className={styles.formulaireInput}
                />
                <InputText
                  label="Indiquez votre prénom"
                  name="firstName"
                  placeholder="Exemple : David"
                  required
                  className={styles.formulaireInput}
                />
                <InputText
                  label="Indiquez un numéro de téléphone"
                  name="phone"
                  placeholder="Exemple : 0601020304"
                  pattern="^(\+33|0|0033)[1-9]\d{8}$"
                  required
                  className={styles.formulaireInput}
                />
                <InputText
                  label="Indiquez une adresse e-mail"
                  type="email"
                  name="email"
                  placeholder="Exemple : david.dupont@exemple.fr"
                  required
                  className={styles.formulaireInput}
                />
                <InputText
                  label="Indiquez votre rôle au sein de l’entreprise"
                  name="job"
                  placeholder="Exemple : RH, Manager référent"
                  required
                  className={styles.formulaireInput}
                />
              </div>

              <div className={styles.validation}>
                <ButtonComponent icon={<Icon name='angle-right' />} iconPosition='right' label='Suivant' type='submit' />
                {Mention()}
              </div>
            </form>
          }

          <div>
            {
              isTroisièmeEtape() &&
            <>
              <button className={styles.boutonRetour} onClick={retourEtape2}>
                <AngleLeftIcon className={styles.iconeRetour}/> Retour
              </button>
              <div className={styles.champsObligatoires}>
                <p> Etape 3 : Vos besoins et commentaires</p>
              </div>
            </>
            }

            {
              isTroisièmeEtape() && <form className={styles.formulaire}>
                <div className={styles.bodyFormulaireEtape3}>
                  <InputText
                    label="Indiquez le nombre de recrutement POE que vous souhaitez"
                    name="nombre-recrutement"
                    placeholder="Exemple : 3"
                  />
                  <InputArea
                    className={styles.textArea}
                    label="Vous avez la possibilité de nous faire part de vos commentaires ou toute autres informations que vous jugieriez utiles"
                    name="commentaires"
                    placeholder="Saisissez votre texte ici"
                  />
                </div>

                <div className={styles.validation}>
                  <ButtonComponent icon={<Icon name='angle-right'/>} iconPosition='right' label='Envoyer mes informations afin d’être rappelé(e)' type='submit'/>
                  <p>En cliquant sur &ldquo;Je souhaite être rappelé&rdquo;, j&apos;accepte que mes données soient transférées au Pole emploi de la zone géographique
                  dans laquelle je réside en vue d&apos;être rappelé</p>
                </div>
              </form>
            }
          </div>
        </Container>
      </div>
    </>
  );
}
