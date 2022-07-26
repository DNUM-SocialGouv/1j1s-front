import { Modal, ModalClose, ModalContent, ModalFooter, ModalTitle } from '@dataesr/react-dsfr';
import React, { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import Marked from '~/client/components/ui/Marked/Marked';

export default function Rappel() {
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);
  return (
    <section className={styles.rappel}>
      <div className={styles.rappelContainer}>
        <Marked markdown={'## J\'ai des questions sur le Contrat d\'Engagement Jeune'}/>
        <Button buttonType="primary">Je souhaite être contacté(e)</Button>
      </div>
      <Modal
        isOpen={isFiltresAvancésMobileOpen}
        hide={() => setIsFiltresAvancésMobileOpen(false)}
        data-testid="FiltreRechercheMobile"
      >
        <ModalClose hide={() => setIsFiltresAvancésMobileOpen(false)} title="Fermer les filtres"/>
        <ModalTitle className={styles.filtresAvancésModalTitle}>
            J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé
        </ModalTitle>
        <ModalContent className={styles.filtresAvancésModalContenu}>
          <form>
            <label>
          Nom
              <input
                name="isGoing"
                type="text" 
                placeholder='Exemple : Dupont'/>
            </label>
            <br />
            <label>
          Prénom
              <input
                name="numberOfGuests"
                type="text"
                placeholder='Exemple : Jean' />
            </label>
          </form>
              
              
              
        </ModalContent>
        <ModalFooter className={styles.filtresAvancésModalFooter}>
              
        </ModalFooter>
      </Modal>
    </section>
  );
}
