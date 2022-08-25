import { Modal, ModalContent, ModalTitle } from '@dataesr/react-dsfr';
import { useState } from 'react';

import FormulaireDeContactCEJ from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactCEJ';
import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import Marked from '~/client/components/ui/Marked/Marked';


export default function Rappel() {
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function onFormulaireEnvoyé() {
    setIsSuccess(true);
  }
  
  const title = isSuccess ? '' : (
    <>
      J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
      <small>(Tous les champs sont obligatoires)</small>
    </>
  );

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
        <ModalTitle className={styles.rappelTitle}>{ title }</ModalTitle>
        <ModalContent>
          <FormulaireDeContactCEJ onSuccess={() => onFormulaireEnvoyé() }>
            <Button onClick={ () => setIsPopInOpen(false)} buttonType="primary" title="Revenir à la page" className={styles.btnSuccess}>Fermer</Button>
          </FormulaireDeContactCEJ>
        </ModalContent>
      </Modal>
    </section>
  );
}
