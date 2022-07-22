import { Modal, ModalClose, ModalContent, ModalTitle } from '@dataesr/react-dsfr';
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
      <div className={ styles.rappelModal }>
      <Modal
        isOpen={isPopInOpen}
        hide={() => setIsPopInOpen(false)}
        data-testid="FormulaireRappel"
        className={ styles.rappelModal__Open }
      >
        <ModalClose hide={() => setIsPopInOpen(false)} title="Fermer les filtres"/>
        <ModalTitle className={styles.rappelModal__Title}>
            J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
        </ModalTitle>
        <ModalContent>
          <form className={styles.rappelModal__Form}>
            <label htmlFor='firstName'>Prénom
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="firstName"
              placeholder="Exemple : Jean"/></label>
            <label htmlFor='lastName'>Nom
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="lastName"
              placeholder="Exemple : Dupont"/></label>
            <label htmlFor='email'>Adresse email
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="email"
              placeholder="Exemple : jean.dupont@gmail.com"/></label>
            <label htmlFor='phone'>Téléphone
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="phone"
              placeholder="Exemple : 0606060606"/></label>
            <label htmlFor='age'>Age
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="age"
              placeholder="Exemple : 21"/></label>
            <label htmlFor='country'>Ville
            <input
              type='text'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name="country"
              placeholder="Exemple : Paris"/></label>
            <p>J&apos;accepte de recevoir des informations de « 1 Jeune, 1 Solution »</p>
            <Button
              buttonType="primary"
            >
              Envoyer la demande
            </Button>
          </form>
          <div className={styles.rappelModal__Open__Text}>
        <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
        </div>
        </ModalContent>
      </Modal>
      </div>
    </section>
  );
}
