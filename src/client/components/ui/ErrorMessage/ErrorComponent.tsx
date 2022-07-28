import React from 'react';

import styles from '~/client/components/ui/ErrorMessage/ErrorMessage.module.css';
import { IncorrectRequestErrorMessage } from '~/client/components/ui/ErrorMessage/IncorrectRequestErrorMessage';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { UnavailableServiceErrorMessage } from '~/client/components/ui/ErrorMessage/UnavailableServiceErrorMessage';
import { ErrorType } from '~/server/errors/error.types';

interface ErrorProps {
  errorType?: ErrorType
}

export const ErrorComponent = (props: ErrorProps) => {
  const { errorType } = props;
  return (
    <>
      {!errorType && <NoResultErrorMessage className={styles.errorMessage}/>}
      {errorType === ErrorType.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage className={styles.errorMessage}/>}
      {errorType === ErrorType.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage className={styles.errorMessage} />}
      {errorType === ErrorType.CONTENU_INDISPONIBLE && <NoResultErrorMessage className={styles.errorMessage} />}
    </>
  );
};
