import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import useReferrer from '~/client/hooks/useReferrer';
import { URL_DEPOSER_OFFRE } from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaire.module.scss';

export default function StageDeposerOffreFormulaireEnvoye() {
	useReferrer();

	return (
		<Container className={styles.container}>
			<div className={styles.texteValidation}>Cette offre est soumise à une validation avant sa mise en ligne.</div>
			<div className={styles.boutonsConfirmationEnvoi}>
				<Link
					href={'/'}
					appearance={'asPrimaryButton'}
				>
					Retourner à l’accueil
				</Link>
				<Link
					href={URL_DEPOSER_OFFRE}
					appearance={'asSecondaryButton'}
				>
					Déposer une offre de stage
				</Link>
			</div>
		</Container>
	);}
