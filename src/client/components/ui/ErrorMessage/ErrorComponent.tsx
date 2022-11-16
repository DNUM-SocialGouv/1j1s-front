import React from 'react';

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
      {!errorType && <NoResultErrorMessage />}
      {errorType === ErreurMétier.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage />}
      {errorType === ErreurMétier.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage  />}
      {errorType === ErreurMétier.CONTENU_INDISPONIBLE && <NoResultErrorMessage />}
    </>
  );
};
