import { Modal, ModalContent, ModalTitle, TextInput } from '@dataesr/react-dsfr';
import React, { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import Marked from '~/client/components/ui/Marked/Marked';
import { Select } from '~/client/components/ui/Select/Select';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { AgeJeune } from '~/server/contrat-engagement-jeune/domain/ageCEJ';

const titre = `
## J'ai des questions sur le Contrat d'Engagement Jeune et souhaite être rappelé(e)
`;
const titreMobile = `
## J'ai des questions sur le Contrat d'Engagement Jeune
`;

export default function Rappel() {
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [inputAge, setInputAge] = useState('');

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
          <h2>J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé</h2>
          <p>(Tous les champs sont obligatoires)</p>
        </ModalTitle>
        <ModalContent>
          <form>
            <div className={styles.rappelForm}>
              <TextInput 
                label='Prénom'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name='firstname'
                placeholder='Exemple : Jean'/>
              <TextInput 
                label='Nom'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name='lastname'
                placeholder='Exemple : Dupont'/>
              <TextInput
                label='Adresse email'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name='mail'
                placeholder='Exemple : jean.dupont@gmail.com'/>
              <TextInput
                label='Téléphone'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                name='phone'
                placeholder='Exemple : 0606060606'/>
              <Select
                label='Age'
                name="ageList"
                optionList={AgeJeune.AGE}
                onChange={setInputAge}
                value={inputAge}
              />
              <TextInput
                label='Ville'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
