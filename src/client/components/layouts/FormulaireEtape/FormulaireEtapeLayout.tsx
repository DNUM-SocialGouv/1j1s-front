import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './FormulaireEtapeLayout.module.scss';

interface FormulaireEtapeLayoutProps {
	étape: string
	formulaire: React.ReactElement
	urlÉtapePrécédente?: string
}

export function FormulaireÉtapeLayout(props: FormulaireEtapeLayoutProps) {
	const { étape, formulaire, urlÉtapePrécédente } = props;
	return (
		<Container className={styles.container}>
			<ÉtapeFormulaire étape={étape} />
			{ urlÉtapePrécédente && <Link
				href={urlÉtapePrécédente}
				appearance="asBackButton"
				className={styles.boutonRetour}
			>
        Retour à l’étape précédente
			</Link>}
			{ formulaire }
		</Container>
	);
}


const ÉtapeFormulaire = (props: {étape: string}) => <div className={styles.étape}>{props.étape}</div>;
