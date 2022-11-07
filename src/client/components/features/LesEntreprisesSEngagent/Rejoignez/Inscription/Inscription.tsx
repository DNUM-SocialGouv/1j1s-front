import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import FormulaireDeContactEntreprise from '~/client/components/features/LesEntreprisesSEngagent/FormulaireDeContactEntreprise';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité, {
  SecteurActivité,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LesEntreprisesSEngagentService } from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

import styles from './Inscription.module.scss';

export type FormulaireEngagement = FormulaireEtape1Props & FormulaireEtape2Props

interface FormulaireEtape1Props {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: string;
  taille: string;
}

interface FormulaireEtape2Props {
  prénom: string;
  nom: string;
  email: string;
  travail: string;
  téléphone: string;
}

export enum Etape {
  ETAPE_1 = 'Etape 1 sur 2',
  ETAPE_2 = 'Etape 2 sur 2'
}

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export default function Inscription() {
  const router = useRouter();
  const [isContactezNousOpen, setIsContactezNousOpen] = useState<boolean>(false);
  const [etape, setEtape] = useState<Etape>(Etape.ETAPE_1);
  const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);
  const lesEntreprisesSEngagentService = useDependency<LesEntreprisesSEngagentService>('lesEntreprisesSEngagentService');

  const [formulaireEtape1, setFormulaireEtape1] = useState<FormulaireEtape1Props>({
    codePostal: '',
    nomSociété: '',
    secteur: '',
    siret: '',
    taille: '',
    ville: '',
  });

  const [formulaireEtape2, setFormulaireEtape2] = useState<FormulaireEtape2Props>({ email: '', nom: '', prénom: '', travail: '', téléphone: '' });

  const isPremièreEtape = () => etape === Etape.ETAPE_1;
  const isDeuxièmeEtape = () => etape === Etape.ETAPE_2;
  const isPremièreEtapeValid = () => Object.values(formulaireEtape1).every((value) => value.length > 0);
  const isDeuxièmeEtapeValid = () => Object.values(formulaireEtape2).every((value) => value.length > 0);

  const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<Commune>();
  const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

  function goToEtape2(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return (isPremièreEtape() && isPremièreEtapeValid()) && setEtape(Etape.ETAPE_2);
  }

  function returnToLesEntreprisesSEngagent() {
    return router.push('/les-entreprises-s-engagent');
  }

  function returnToEtape1() {
    return setEtape(Etape.ETAPE_1);
  }

  async function submitFormulaire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPremièreEtapeValid() && isDeuxièmeEtapeValid()) {
      const response = await lesEntreprisesSEngagentService.envoyerFormulaireEngagement({ ...formulaireEtape1, ...formulaireEtape2 });

      if (isSuccess(response)) {
        setIsFormSuccessfullySent(true);
      }
    }
  }

  function displayFooter() {
    return <div className={styles.footer}>
      Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification, <span
        onClick={() => setIsContactezNousOpen(true)}>contactez-nous</span>
    </div>;
  }

  return (
    <>
      {
        !isFormSuccessfullySent &&
        <>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Image src="/icons/les-entreprises-s-engagent.svg" alt="" width="144" height="80"/>
            </div>
            <div className={styles.titre}>
              <span>REJOIGNEZ  &ldquo;LES ENTREPRISES S&apos;ENGAGENT&rdquo;</span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.etape}>{etape}</div>
            <div className={styles.mandatoryFields}>Tous les champs du formulaire sont obligatoires</div>
            {
              isPremièreEtape() && <div>
                <button className={styles.boutonRetour} onClick={returnToLesEntreprisesSEngagent}>
                  <AngleLeftIcon className={styles.iconeRetour}/> Retour
                </button>
              </div>
            }

            {
              isPremièreEtape() && <form className={styles.formulaire} onSubmit={goToEtape2}>
                <div className={styles.bodyFormulaire}>
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
                        ville: suggestion.ville,
                      });
                    }}
                  />
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
                  <p>Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les transférer à Pôle Emploi.
                      Pour en savoir plus vous pouvez consulter la <Link href={'/confidentialite'}>politique de confidentialité</Link> et les <Link href={'/cgu'}>CGU</Link> de la DGEFP
                  </p>
                </div>
              </form>
            }
            {
              isDeuxièmeEtape() && <div>
                <button className={styles.boutonRetour} onClick={returnToEtape1}>
                  <AngleLeftIcon className={styles.iconeRetour}/> Retour
                </button>
              </div>
            }
            {
              isDeuxièmeEtape() && <form className={styles.formulaire} onSubmit={submitFormulaire}>
                <div className={styles.bodyFormulaire}>
                  <InputText
                    label="Indiquez votre prénom"
                    name="firstName"
                    placeholder="Exemple : Marc, Sonia…"
                    value={formulaireEtape2.prénom}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape2({
                      ...formulaireEtape2,
                      prénom: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <InputText
                    label="Indiquez votre nom"
                    name="lastName"
                    placeholder="Exemple : Ducourt, Dupont…"
                    value={formulaireEtape2.nom}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape2({
                      ...formulaireEtape2,
                      nom: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <InputText
                    label="Indiquez votre adresse e-mail de contact"
                    type="email"
                    name="email"
                    placeholder="Exemple : mail@exemple.com"
                    hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
                    value={formulaireEtape2.email}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape2({
                      ...formulaireEtape2,
                      email: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <InputText
                    label="Indiquez votre fonction au sein de votre entreprise"
                    name="job"
                    placeholder="Exemple : RH, Chargé de communications"
                    value={formulaireEtape2.travail}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape2({
                      ...formulaireEtape2,
                      travail: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <InputText
                    label="Indiquez un numéro de téléphone de contact"
                    name="phone"
                    placeholder="Exemple : 0199999999"
                    pattern="^(\+33|0|0033)[1-9]\d{8}$"
                    hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
                    value={formulaireEtape2.téléphone}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape2({
                      ...formulaireEtape2,
                      téléphone: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                </div>

                <div className={styles.validationEtape2}>
                  <ButtonComponent icon={<Icon name='angle-right' />} iconPosition='right' label='Envoyer le formulaire' type='submit' />
                  <p>Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les transférer à Pôle Emploi.
                      Pour en savoir plus vous pouvez consulter la <Link href={'/confidentialite'}>politique de confidentialité</Link> et les <Link href={'/cgu'}>CGU</Link> de la DGEFP
                  </p>
                </div>

              </form>
            }

            {displayFooter()}

          </div>
          {
            isContactezNousOpen && <FormulaireDeContactEntreprise isOpen={isContactezNousOpen} close={() => setIsContactezNousOpen(false)}/>
          }
        </>
      }

      {isFormSuccessfullySent &&
        <div className={styles.success}>Félicitations, votre formulaire a bien été envoyé !</div>}
    </>
  );
}
