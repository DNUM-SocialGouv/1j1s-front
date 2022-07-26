import { Modal, ModalClose, ModalContent, ModalFooter, ModalTitle, TextInput } from '@dataesr/react-dsfr';
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
      >
        <ModalClose hide={() => setIsPopInOpen(false)} title="Fermer les filtres"/>
        <ModalTitle className={styles.filtresAvancésModalTitle}>
            J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
        </ModalTitle>
        <ModalContent className={styles.filtresAvancésModalContenu}>
          <form>
            <label>
              Prénom
              <TextInput
                type='text'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="firstName"
                placeholder="Exemple : Jean"/>
            </label>
            <label>
              Nom
              <TextInput
                type='text'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="lastName"
                placeholder="Exemple : Dupont"/>
            </label>
            <label>
              Adresse email
              <TextInput
                type='text'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="email"
                placeholder="Exemple : jean.dupont@gmail.com"/>
            </label>
            <label>
              Téléphone
              <TextInput
                type='number'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="phone"
                placeholder="Exemple : 0606060606"/>
            </label>
            <label>
              Age
              <TextInput
                type='text'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="age"
                placeholder="Exemple : 21 ans"/>
            </label>
            <label>
              Ville
              <TextInput
                type='text'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name="ville"
                placeholder="Exemple : Paris"/>
            </label>
          </form>    
        </ModalContent>
        <ModalFooter className={styles.filtresAvancésModalFooter}>
              
        </ModalFooter>
      </Modal>
    </section>
  );
}
