import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { isSuccess } from '~/server/errors/either';

import styles from './LesEntreprisesSEngagentInscription.module.scss';

export type FormulaireEngagement = FormulaireEtape1Props & FormulaireEtape2Props

interface FormulaireEtape1Props {
  nomSociété: string
  codePostal: string
  siret: string
  secteur: string
  taille: string
}

interface FormulaireEtape2Props {
  prénom: string
  nom: string
  email: string
  travail: string
  téléphone: string
}

export enum Etape {
  ETAPE_1 = 'Etape 1 sur 2',
  ETAPE_2 = 'Etape 2 sur 2'
}

export default function LesEntreprisesSEngagentInscription() {
  const [etape, setEtape] = useState<Etape>(Etape.ETAPE_1);
  const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);
  const lesEntreprisesSEngagementService  = useDependency<LesEntreprisesSEngagentService>('lesEntreprisesSEngagementService');

  const [formulaireEtape1, setFormulaireEtape1] = useState<FormulaireEtape1Props>({ codePostal: '', nomSociété: '', secteur: '', siret: '', taille: '' });

  const [formulaireEtape2, setFormulaireEtape2] = useState<FormulaireEtape2Props>({ email: '', nom: '', prénom: '', travail: '', téléphone: '' });

  const isPremièreEtape = () => etape === Etape.ETAPE_1;
  const isDeuxièmeEtape = () => etape === Etape.ETAPE_2;
  const isPremièreEtapeValid = () => Object.values(formulaireEtape1).every((value) => value.length > 0);
  const isDeuxièmeEtapeValid = () => Object.values(formulaireEtape2).every((value) => value.length > 0);

  function goToEtape1(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return (isPremièreEtape() && isPremièreEtapeValid()) && setEtape(Etape.ETAPE_2);
  }

  async function submitFormulaire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPremièreEtapeValid() && isDeuxièmeEtapeValid()) {
      const response = await lesEntreprisesSEngagementService.envoyerFormulaireEngagement({ ...formulaireEtape1, ...formulaireEtape2 });

      if (isSuccess(response)) {
        setIsFormSuccessfullySent(true);
      }
    }
  }

  return (
    <>
      {
        !isFormSuccessfullySent &&
        <>
          <div className={styles.header}>
            <Image src="/icons/les-entreprises-s-engagent.svg" alt="" width="65" height="65"/>
            <span>Les entreprises s&apos;engagent</span>
          </div>

          <div className={styles.content}>
            <div className={styles.etape}>{etape}</div>
            <div className={styles.mandatoryFields}>Tous les champs du formulaire sont obligatoires</div>
            {
              isPremièreEtape() && <form className={styles.formulaire} onSubmit={goToEtape1}>
                <div className={styles.bodyFormulaire}>
                  <TextInput
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
                  <TextInput
                    label="Indiquez la ville du siège social de l’entreprise"
                    name="companyPostalCode"
                    placeholder="Exemple : 94052, Paris 2…"
                    value={formulaireEtape1.codePostal}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                      ...formulaireEtape1,
                      codePostal: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <TextInput
                    label="Indiquer votre numéro de SIRET"
                    name="companySiret"
                    placeholder="Exemple : 12345678901112"
                    value={formulaireEtape1.siret}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                      ...formulaireEtape1,
                      siret: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <TextInput
                    label="Indiquer le secteur d’activité de votre entreprise"
                    name="companySector"
                    placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
                    value={formulaireEtape1.secteur}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                      ...formulaireEtape1,
                      secteur: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                  <TextInput
                    label="Indiquer la taille de votre entreprise"
                    name="companySize"
                    placeholder="Exemple : 250 à 499 salariés"
                    value={formulaireEtape1.taille}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireEtape1({
                      ...formulaireEtape1,
                      taille: event.currentTarget.value,
                    })}
                    className={styles.formulaireInput}
                  />
                </div>

                <div className={styles.buttonFormulaire}>
                  <Button buttonType="withRightIcon" type="submit" icon={<AngleRightIcon/>}>Suivant</Button>
                </div>

                <div className={styles.footer}>
                  Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification, <a href="#">contactez-nous</a>
                </div>

              </form>
            }
            {
              isDeuxièmeEtape() && <form className={styles.formulaire} onSubmit={submitFormulaire}>
                <div className={styles.bodyFormulaire}>
                  <TextInput
                    label="Indiquer votre prénom"
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
                  <TextInput
                    label="Indiquer votre nom"
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
                  <TextInput
                    label="Indiquer votre adresse e-mail de contact"
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
                  <TextInput
                    label="Indiquer votre fonction au sein de votre entreprise"
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
                  <TextInput
                    label="Indiquer un numéro de téléphone de contact"
                    name="phone"
                    placeholder="Exemple : 0199999999"
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

                <div className={styles.buttonFormulaire}>
                  <Button buttonType="primary" type="submit" icon={<AngleRightIcon/>}>Envoyer le formulaire</Button>
                </div>

                <div className={styles.footer}>
                  Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification, <a href="#">contactez-nous</a>
                </div>

              </form>
            }
          </div>
        </>
      }

      {isFormSuccessfullySent &&
        <div className={styles.success}>Félicitations, votre formulaire a bien été envoyé !</div>}
    </>
  );
}
