import React from 'react';

import { IncorrectRequestErrorMessage } from '~/client/components/ui/ErrorMessage/IncorrectRequestErrorMessage';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { UnavailableServiceErrorMessage } from '~/client/components/ui/ErrorMessage/UnavailableServiceErrorMessage';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';

interface ErrorProps {
  errorType?: Erreur
}

export const ErrorComponent = (props: ErrorProps) => {
	const { errorType } = props;
	return (
		<>
			{!errorType && <NoResultErrorMessage />}
			{errorType === ErreurMétier.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage />}
			{errorType === ErreurMétier.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage  />}
			{errorType === ErreurMétier.CONTENU_INDISPONIBLE && <NoResultErrorMessage />}
			{errorType === ErreurTechnique.TOO_MANY_REQUESTS && <UnavailableServiceErrorMessage />}
		</>
	);
};
