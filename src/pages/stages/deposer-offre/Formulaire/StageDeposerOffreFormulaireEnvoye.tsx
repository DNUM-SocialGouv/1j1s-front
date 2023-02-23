import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useReferrer from '~/client/hooks/useReferrer';
import {
	LABEL_FORMULAIRE_1,
	LABEL_FORMULAIRE_3,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaire.module.scss';

export default function StageDeposerOffreFormulaireEnvoye() {
	useReferrer();

	const router = useRouter();

	const [valueEtape1] = useLocalStorage(LABEL_FORMULAIRE_1);
	const [valueEtape3] = useLocalStorage(LABEL_FORMULAIRE_3);
	const isFailure = !valueEtape1 || !valueEtape3;

	useEffect(() => {
		if (isFailure) router.push(URL_DEPOSER_OFFRE);
	}, [isFailure, router]);

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
