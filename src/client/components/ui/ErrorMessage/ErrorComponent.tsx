import React from 'react';

import styles from '~/client/components/ui/ErrorMessage/ErrorMessage.module.scss';
import { IncorrectRequestErrorMessage } from '~/client/components/ui/ErrorMessage/IncorrectRequestErrorMessage';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { UnavailableServiceErrorMessage } from '~/client/components/ui/ErrorMessage/UnavailableServiceErrorMessage';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

interface ErrorProps {
  errorType?: ErreurMétier
}

export const ErrorComponent = (props: ErrorProps) => {
  const { errorType } = props;
  return (
    <>
      {!errorType && <NoResultErrorMessage className={styles.errorMessage}/>}
      {errorType === ErreurMétier.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage className={styles.errorMessage}/>}
      {errorType === ErreurMétier.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage className={styles.errorMessage} />}
      {errorType === ErreurMétier.CONTENU_INDISPONIBLE && <NoResultErrorMessage className={styles.errorMessage} />}
    </>
  );
};
