import classNames from 'classnames';
import React, { useState } from 'react';

import {
  FormulaireDemandeDeContactAccompagnement,
} from '~/client/components/features/Accompagnement/DemandeDeContact/Formulaire/FormulaireDemandeDeContactAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/DemandeDeContact/ModalDemandeDeContactAccompagnement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import {
  ContactÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

interface ModalDemandeDeContactAccompagnementProps {
  contactÉtablissementAccompagnement: ContactÉtablissementAccompagnement
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export function ModalDemandeDeContactAccompagnement(props: ModalDemandeDeContactAccompagnementProps) {
  const { contactÉtablissementAccompagnement, isOpen, setIsOpen } = props;
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <ModalComponent
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      aria-labelledby={!isSuccess ? 'dialog_label' : 'dialog_label_success'}
    >
      {!isSuccess &&
        <ModalComponent.Title className={styles.modalTitle} id="dialog_label">
          Je souhaite être contacté(e) par la Mission Locale
        </ModalComponent.Title>
      }
      <ModalComponent.Content
        className={classNames({ [styles.rappelContent]: !isSuccess, [styles.rappelContentSuccess]: isSuccess })}
      >
        {!isSuccess ? (
          <>
            <small className={styles.modalSubTitle}>Tous les champs sont obligatoires sauf mention contraire</small>
            <FormulaireDemandeDeContactAccompagnement
              contactÉtablissementAccompagnement={contactÉtablissementAccompagnement}
              onSuccess={() => setIsSuccess(true)}
            />
          </>
        ) : (
          <div className={styles.success}>
            <CheckIcon circled={true} animate className={styles.successIcon}/>
            <h1 id="dialog_label_success" className={styles.successMessage}>Votre demande a bien été transmise !</h1>
            <ButtonComponent
              type="button"
              label="Fermer"
              onClick={() => setIsOpen(false)}
              title="Fermer, Revenir à la page"
            />
          </div>
        )}
      </ModalComponent.Content>
    </ModalComponent>
  );
}
