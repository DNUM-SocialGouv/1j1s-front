import { Modal, ModalClose, ModalContent, ModalTitle, TextInput } from '@dataesr/react-dsfr';
import React, { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import Marked from '~/client/components/ui/Marked/Marked';

export default function Rappel() {
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  return (
    <section className={styles.rappel}>
      <div className={styles.rappelContainer}>
        <Marked markdown={'## J\'ai des questions sur le Contrat d\'Engagement Jeune'}/>
        <Button buttonType="primary">Je souhaite être contacté(e)</Button>
      </div>
      <Modal
        isOpen={isPopInOpen}
        hide={() => setIsPopInOpen(false)}
        data-testid="FormulaireRappel"
        className={styles.modal}
      >
        <ModalClose hide={() => setIsPopInOpen(false)} title="Fermer les filtres"/>
        <ModalTitle className={styles.modalTitle}>
            J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
        </ModalTitle>
        <ModalContent className={styles.modalContenu}>
          <form className={styles.modalForm}>
            <label htmlFor='firstName'>Prénom</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="firstName"
              placeholder="Exemple : Jean"/>
            <label htmlFor='lastName'>Nom</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="lastName"
              placeholder="Exemple : Dupont"/>
            <label htmlFor='email'>Adresse email</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="email"
              placeholder="Exemple : jean.dupont@gmail.com"/>
            <label htmlFor='phone'>Téléphone</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="phone"
              placeholder="Exemple : 0606060606"/>
            <label htmlFor='age'>Age</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="age"
              placeholder="Exemple : 21"/>
            <label htmlFor='country'>Ville</label>
            <TextInput
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="country"
              placeholder="Exemple : Paris"/>
            J&apos;accepte de recevoir des informations de « 1 Jeune, 1 Solution »
            <Button
              buttonType="primary"
            >
          Envoyer la demande
            </Button>
        En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune
          </form>
        </ModalContent>
      </Modal>
    </section>
  );
}
