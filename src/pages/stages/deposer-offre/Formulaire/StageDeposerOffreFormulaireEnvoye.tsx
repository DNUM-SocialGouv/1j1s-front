import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useReferrer from '~/client/hooks/useReferrer';
import useSessionStorage from '~/client/hooks/useSessionStorage';

import styles from './StageDeposerOffreFormulaire.module.scss';

export default function StageDeposerOffreFormulaireEnvoye() {
	useReferrer();

	const router = useRouter();

	const [valueEtape1] = useLocalStorage('formulaireEtape1');
	const [valueEtape2] = useSessionStorage('formulaireEtape2');
	const [valueEtape3] = useLocalStorage('formulaireEtape3');

	if (!valueEtape1 || !valueEtape2 || !valueEtape3){
		router.push('/stages/deposer-offre');
	}

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
					href={'/stages/deposer-offre'}
					appearance={'asSecondaryButton'}
				>
					Déposer une offre de stage
				</Link>
			</div>
		</Container>
	);}
