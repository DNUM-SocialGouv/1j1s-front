import { Modal, ModalContent, ModalTitle, TextInput } from '@dataesr/react-dsfr';
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
      <div className={ styles.rappelModal }>
        <Modal
          isOpen={isPopInOpen}
          hide={() => setIsPopInOpen(false)}
        >
          <ModalTitle className={styles.rappelModal__Title}>
            J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
          </ModalTitle>
          <ModalContent>
            <form>
              <TextInput 
                label='Prénom'
                name='firstname'
                placeholder='Exemple : Jean'/>
              <TextInput 
                label='Nom'
                name='lasstname'
                placeholder='Exemple : Dupont'/>
              <TextInput
                label='Adresse email'
                name='mail'
                placeholder='Exemple : jean.dupont@gmail.com'/>
              <TextInput
                label='Téléphone'
                name='phone'
                placeholder='Exemple : 0606060606'/>
              <SelectSingle 
                label='Age'
                name='age'
                optionList={[{
                  libellé: '21',
                  valeur: '21',
                },{
                  libellé: '22',
                  valeur: '22',
                }]}/>
              <TextInput
                label='Ville'
                name='ville'
                placeholder='Exemple : Paris'/>
              <Checkbox label={'J\'accepte de recevoir des informations de « 1 Jeune, 1 Solution »'} />
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
