import React from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import { FormulaireDeContactMissionLocale } from './FormulaireDeContactMissionLocale';
import styles from './ModaleFormulaireDeContactMissionLocale.module.scss';

interface ModaleFormulaireDeContactMissionLocaleProps {
  isPopInOpen: boolean,
  setIsPopInOpen: (value: boolean) => void,
  isSuccess: boolean,
  setIsSuccess: (value: boolean) => void,
}

export function ModaleFormulaireDeContactMissionLocale({ isPopInOpen, setIsPopInOpen, isSuccess, setIsSuccess }: ModaleFormulaireDeContactMissionLocaleProps) {
  return (
    <ModalComponent
      isOpen={isPopInOpen}
      close={() => setIsPopInOpen(false)}
      aria-labelledby={ !isSuccess ? 'dialog_label' : 'dialog_label_success'}
    >
      {
        !isSuccess &&
        <ModalComponent.Title className={styles.modalTitle} id="dialog_label">
          Je souhaite être contacté(e) par la Mission Locale
        </ModalComponent.Title>
      }
      <ModalComponent.Content className={!isSuccess ? styles.rappelContent : styles.rappelContentSuccess}>
        {
          !isSuccess &&
          <small className={styles.modalSubTitle}>Tous le champs sont obligatoires sauf mention contraire</small>
        }
        {
          !isSuccess ?
            <FormulaireDeContactMissionLocale setIsSuccess={setIsSuccess}/>
            :
            <div className={styles.success}>
              <CheckIcon circled={true} animate className={styles.successIcon} />
              <h1 id="dialog_label_success" className={styles.successMessage}>Votre demande a bien été transmise !</h1>
              <ButtonComponent label='Fermer' onClick={ () => setIsPopInOpen(false)} title="Fermer, Revenir à la page" />
            </div>
        }
      </ModalComponent.Content>
    </ModalComponent>
  );
}
