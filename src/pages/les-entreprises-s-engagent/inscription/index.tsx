import Image from 'next/image';
import React, { FormEvent, useState } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { InputValue, TextInput } from '~/client/components/ui/TextInput/TextInput';

import styles from './LesEntreprisesSEngagentInscription.module.scss';


export default function LesEntreprisesSEngagentInscription() {
  const [etape, setEtape] = useState<1 | 2>(1);


  function displayEtape() {
    if(etape === 1) {
      return 'Etape 1 sur 2';
    }
    return 'Etape 2 sur 2';
  }

  function goToEtape2() {
    setEtape(2);
  }

  function submitFormulaire(event: FormEvent<HTMLFormElement>) {
    console.log(event);
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
              />
              <TextInput
                label="Indiquez la ville du siège social de l’entreprise"
                name="companyPostalCode"
                placeholder="Exemple : 94052, Paris 2…"
                necessity="required"
              />
              <TextInput
                label="Indiquer votre numéro de SIRET"
                name="companySiret"
                placeholder="Exemple : 12345678901112"
                necessity="required"
              />
              <TextInput
                label="Indiquer le secteur d’activité de votre entreprise"
                name="companySector"
                placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
                necessity="required"
              />
              <TextInput
                label="Indiquer la taille de votre entreprise"
                name="companySize"
                placeholder="Exemple : 250 à 499 salariés"
                necessity="required"
              />
            </div>
            :
            <div className={styles.deuxiemePartieFormulaire}>
              <TextInput
                label="Indiquer votre prénom"
                name="firstName"
                placeholder="Exemple : Marc, Sonia…"
                necessity="required"
              />
              <TextInput
                label="Indiquer votre nom"
                name="lastName"
                placeholder="Exemple : Ducourt, Dupont…"
                necessity="required"
              />
              <TextInput
                label="Indiquer votre adresse e-mail de contact"
                name="email"
                placeholder="Exemple : mail@exemple.com"
                hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
                necessity="required"
              />
              <TextInput
                label="Indiquer votre fonction au sein de votre entreprise"
                name="job"
                placeholder="Exemple : RH, Chargé de communications"
                necessity="required"
              />
              <TextInput
                label="Indiquer un numéro de téléphone de contact"
                name="phone"
                placeholder="Exemple : 0199999999"
                hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
                necessity="required"
              />
            </div>
        }
        {
          etape === 1 ?
            <Button buttonType="withRightIcon" icon={<AngleRightIcon />} onClick={(event: MouseEvent<>) => setEtape(2)}>Suivant</Button>
            :
            <Button buttonType="primary" icon={<AngleRightIcon />}>Envoyer le formulaire</Button>
        }
      </form>
      <div className={styles.footer}>
        Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification, contactez-nous
      </div>
    </>
  );

}
