import { Modal, ModalContent, ModalTitle } from '@dataesr/react-dsfr';
import Image from 'next/image';
import check from 'public/images/CEJ/check.handwriting.jpg';
import { useState } from 'react';

import FormulaireDeContact from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact';
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

  const contentFormulaire = (
    <>
      <FormulaireDeContact onSuccess={() => onFormulaireEnvoyé() } />
      <div className={styles.rappelText}>
        <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
      </div>
    </>
  );

  const contentSuccess = (
    <div className={ styles.success }>
      <Image src={check} alt=""/>
      <h3>Votre demande a bien été transmise !</h3>
      <Button onClick={ () => setIsPopInOpen(false)} buttonType="primary">Fermer</Button>
    </div>
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
        <ModalContent>{ isSuccess ? contentSuccess : contentFormulaire }</ModalContent>
      </Modal>
    </section>
  );
}
