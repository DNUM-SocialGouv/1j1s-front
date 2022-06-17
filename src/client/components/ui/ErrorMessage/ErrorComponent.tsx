
import React from 'react';

import styles from '~/client/components/features/RechercherOffre/RechercherOffre.module.css';
import { IncorrectRequestErrorMessage } from '~/client/components/ui/ErrorMessage/IncorrectRequestErrorMessage';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { UnavailableServiceErrorMessage } from '~/client/components/ui/ErrorMessage/UnavailableServiceErrorMessage';
import { UnexpectedErrorMessage } from '~/client/components/ui/ErrorMessage/UnexpectedErrorMessage';
import { ErrorType } from '~/server/errors/error.types';

interface ErrorProps {
  errorType?: ErrorType
  showError: boolean
}

export const ErrorComponent = (props: ErrorProps) => {
  const { errorType, showError } = props;
  if (!showError) return null;
  return (
    <>
      {!errorType && <NoResultErrorMessage className={styles.errorMessage}/>}
      {errorType === ErrorType.ERREUR_INATTENDUE && <UnexpectedErrorMessage className={styles.errorMessage}/>}
      {errorType === ErrorType.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage className={styles.errorMessage}/>}
      {errorType === ErrorType.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage className={styles.errorMessage} />}
    </>
  );
};
