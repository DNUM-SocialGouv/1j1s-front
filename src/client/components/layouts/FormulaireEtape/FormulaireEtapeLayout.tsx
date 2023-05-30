import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

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
			{ urlÉtapePrécédente && <LinkStyledAsButton
				href={urlÉtapePrécédente}
				appearance="asSecondaryButton"
				iconPosition={'left'}
				icon={<Icon name="angle-left"/>}
				className={styles.boutonRetour}
			>
        Retour à l’étape précédente
			</LinkStyledAsButton>}
			{ formulaire }
		</Container>
	);
}


const ÉtapeFormulaire = (props: {étape: string}) => <div className={styles.étape}>{props.étape}</div>;
