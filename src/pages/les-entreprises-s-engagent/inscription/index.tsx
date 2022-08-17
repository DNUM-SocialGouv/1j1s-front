import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';

import styles from './LesEntreprisesSEngagentInscription.module.scss';

interface FormulaireSociétéEtape1Props {
  nom: string
  codePostal: string
  siret: string
  secteur: string
  taille: string
}

interface FormulaireContactEtape2Props {
  prénom: string
  nom: string
  email: string
  travail: string
  téléphone: string
}

export default function LesEntreprisesSEngagentInscription() {
  const [etape, setEtape] = useState<1 | 2>(1);
  const rechercheAlternanceForm = useRef<HTMLFormElement>(null);
  const [validation, setValidation] = useState<boolean>(false);

  const [formulaireSociétéEtape1Props, setFormulaireSociétéEtape1Props] = useState<FormulaireSociétéEtape1Props>({
    codePostal: '',
    nom: '',
    secteur: '',
    siret: '',
    taille: '',
  });

  const [formulaireContactEtape2Props, setFormulaireContactEtape2Props] = useState<FormulaireContactEtape2Props>({
    email: '',
    nom: '',
    prénom: '',
    travail: '',
    téléphone: '',
  });


  function displayEtape() {
    if(etape === 1) {
      return 'Etape 1 sur 2';
    }
    return 'Etape 2 sur 2';
  }

  function goToEtape2(event: any) {
    event.preventDefault();

    if(Object.values(formulaireSociétéEtape1Props).every((value) => value.length > 0)) {
      setEtape(2);
    } else {
      setValidation(true);
    }
  }

  function submitFormulaire(event: FormEvent<HTMLFormElement>) {
    if(
      Object.values(formulaireSociétéEtape1Props).every((value) => value.length > 0)
      && Object.values(formulaireContactEtape2Props).every((value) => value.length > 0)
    ) {
      console.log(event);
    }
    console.log('cassé');
  }

  return (
    <>
      <div className={styles.heading}>
        <Image src="/images/logos/france-relance.svg" alt="" width="65" height="65" />
        <span>Les entreprises s&apos;engagent</span>
      </div>
      <div className={styles.etape}>
        {displayEtape()}
      </div>
      <form
        ref={rechercheAlternanceForm}
        onSubmit={submitFormulaire}
      >
        {
          etape === 1 ?
            <div className={styles.premierePartieFormulaire}>
              <TextInput
                label="Indiquez le nom de l’entreprise"
                name="companyName"
                placeholder="Exemple : Crédit Agricole, SNCF…"
                necessity="required"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireSociétéEtape1Props({ ...formulaireSociétéEtape1Props, nom: event.currentTarget.value })}
                validation={() => formulaireSociétéEtape1Props.nom.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
              />
              <TextInput
                label="Indiquez la ville du siège social de l’entreprise"
                name="companyPostalCode"
                placeholder="Exemple : 94052, Paris 2…"
                necessity="required"
                validation={() => formulaireSociétéEtape1Props.codePostal.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireSociétéEtape1Props({ ...formulaireSociétéEtape1Props, codePostal: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer votre numéro de SIRET"
                name="companySiret"
                placeholder="Exemple : 12345678901112"
                necessity="required"
                validation={() => formulaireSociétéEtape1Props.siret.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireSociétéEtape1Props({ ...formulaireSociétéEtape1Props, siret: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer le secteur d’activité de votre entreprise"
                name="companySector"
                placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
                necessity="required"
                validation={() => formulaireSociétéEtape1Props.secteur.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireSociétéEtape1Props({ ...formulaireSociétéEtape1Props, secteur: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer la taille de votre entreprise"
                name="companySize"
                placeholder="Exemple : 250 à 499 salariés"
                necessity="required"
                validation={() => formulaireSociétéEtape1Props.taille.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireSociétéEtape1Props({ ...formulaireSociétéEtape1Props, taille: event.currentTarget.value })}
              />
            </div>
            :
            <div className={styles.deuxiemePartieFormulaire}>
              <TextInput
                label="Indiquer votre prénom"
                name="firstName"
                placeholder="Exemple : Marc, Sonia…"
                necessity="required"
                validation={() => formulaireContactEtape2Props.prénom.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireContactEtape2Props({ ...formulaireContactEtape2Props, prénom: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer votre nom"
                name="lastName"
                placeholder="Exemple : Ducourt, Dupont…"
                necessity="required"
                validation={() => formulaireContactEtape2Props.nom.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireContactEtape2Props({ ...formulaireContactEtape2Props, nom: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer votre adresse e-mail de contact"
                name="email"
                placeholder="Exemple : mail@exemple.com"
                hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
                necessity="required"
                validation={() => formulaireContactEtape2Props.email.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireContactEtape2Props({ ...formulaireContactEtape2Props, email: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer votre fonction au sein de votre entreprise"
                name="job"
                placeholder="Exemple : RH, Chargé de communications"
                necessity="required"
                validation={() => formulaireContactEtape2Props.travail.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireContactEtape2Props({ ...formulaireContactEtape2Props, travail: event.currentTarget.value })}
              />
              <TextInput
                label="Indiquer un numéro de téléphone de contact"
                name="phone"
                placeholder="Exemple : 0199999999"
                hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
                necessity="required"
                validation={() => formulaireContactEtape2Props.téléphone.length > 0 ? null : 'champs requis'}
                triggerValidation={validation}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireContactEtape2Props({ ...formulaireContactEtape2Props, téléphone: event.currentTarget.value })}
              />
            </div>
        }
        {
          etape === 1 ?
            <Button buttonType="withRightIcon" icon={<AngleRightIcon />} onClick={goToEtape2}>Suivant</Button>
            :
            <Button buttonType="primary" type="submit" icon={<AngleRightIcon />}>Envoyer le formulaire</Button>
        }

        <input type="hidden" data-testid="Nom société" name="nomSociete" value={formulaireSociétéEtape1Props.nom}/>
        <input type="hidden" data-testid="Code postal société" name="codePostalSociete" value={formulaireSociétéEtape1Props.codePostal}/>
        <input type="hidden" data-testid="Siret société" name="siret" value={formulaireSociétéEtape1Props.siret}/>
        <input type="hidden" data-testid="Secteur société" name="secteur" value={formulaireSociétéEtape1Props.secteur}/>
        <input type="hidden" data-testid="Taille société" name="taille" value={formulaireSociétéEtape1Props.taille}/>
        <input type="hidden" data-testid="Prénom contact" name="prenom" value={formulaireContactEtape2Props.prénom}/>
        <input type="hidden" data-testid="Nom contact" name="nom" value={formulaireContactEtape2Props.nom}/>
        <input type="hidden" data-testid="Email contact" name="email" value={formulaireContactEtape2Props.email}/>
        <input type="hidden" data-testid="Travail contact" name="travail" value={formulaireContactEtape2Props.travail}/>
        <input type="hidden" data-testid="Téléphone contact" name="téléphone" value={formulaireContactEtape2Props.téléphone}/>
      </form>
      <div className={styles.footer}>
        Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification, contactez-nous
      </div>
    </>
  );

}
