import { Modal, ModalContent, ModalTitle, Select, TextInput } from '@dataesr/react-dsfr';
import React, { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
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
      >
        <ModalTitle className={styles.rappelTitle}>
          <h3>J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé</h3>
          <h4>(Tous les champs sont obligatoires)</h4>
        </ModalTitle>
        <ModalContent>
          <form>
            <div className={styles.rappelForm}>
              <TextInput 
                label='Prénom'
                name='firstname'
                placeholder='Exemple : Jean'/>
              <TextInput 
                label='Nom'
                name='lastname'
                placeholder='Exemple : Dupont'/>
              <TextInput
                label='Adresse email'
                name='mail'
                placeholder='Exemple : jean.dupont@gmail.com'/>
              <TextInput
                label='Téléphone'
                name='phone'
                placeholder='Exemple : 0606060606'/>
              <Select
                label='Age'
                name='age'
                placeholder='Temps de travail'
                options={[{}]}/>
              <TextInput
                label='Ville'
                name='ville'
                placeholder='Exemple : Paris'/>
            </div>
            <Checkbox label={'J\'accepte de recevoir des informations de « 1 Jeune, 1 Solution »'} />
            <div className={styles.rappelButton}>
              <Button
                buttonType="primary"
              >
                Envoyer la demande
              </Button>
            </div>
          </form>
          <div className={styles.rappelText}>
            <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
}
