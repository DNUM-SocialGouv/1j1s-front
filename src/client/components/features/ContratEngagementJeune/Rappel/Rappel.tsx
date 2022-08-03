import { Modal, ModalContent, ModalTitle } from '@dataesr/react-dsfr';
import { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import Marked from '~/client/components/ui/Marked/Marked';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { AgeJeune } from '~/server/contrat-engagement-jeune/domain/ageCEJ';


export default function Rappel() {
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [inputAge, setInputAge] = useState('');

  return (
    <section className={styles.rappel}>
      <div className={styles.rappelContainer}>
        <Marked markdown={'## J\'ai des questions sur le Contrat d\'Engagement Jeune'}/>
        <Button onClick={() => setIsPopInOpen(true)} buttonType="primary">Je souhaite être contacté(e)</Button>
      </div>
      <Modal className={styles.rappelModal}
        isOpen={isPopInOpen}
        hide={() => setIsPopInOpen(false)}
      >
        <ModalTitle className={styles.rappelTitle}>
          <h2>J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé</h2>
          <p>(Tous les champs sont obligatoires)</p>
        </ModalTitle>
        <ModalContent>
          <form>
            <div className={styles.rappelForm}>
              <TextInput 
                label='Prénom'
                name='firstname'
                autoFocus
                placeholder='Exemple : Jean'/>
              <TextInput 
                label='Nom'
                name='lastname'
                autoFocus
                placeholder='Exemple : Dupont'/>
              <TextInput
                label='Adresse email'
                name='mail'
                autoFocus
                placeholder='Exemple : jean.dupont@gmail.com'/>
              <TextInput
                label='Téléphone'
                name='phone'
                autoFocus
                placeholder='Exemple : 0606060606'/>
              <Select
                label='Age'
                name="ageList"
                optionList={AgeJeune.AGE}
                onChange={setInputAge}
                value={inputAge}
                closeOnExit={true}/>
              <TextInput
                label='Ville'
                name='ville'
                autoFocus
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
