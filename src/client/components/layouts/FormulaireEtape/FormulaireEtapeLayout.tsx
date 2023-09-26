import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from './FormulaireEtapeLayout.module.scss';

interface FormulaireEtapeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	étape: string
	urlÉtapePrécédente?: string
}

export function FormulaireÉtapeLayout(props: FormulaireEtapeLayoutProps) {
	const { étape, urlÉtapePrécédente, children } = props;
	return (
		<Container className={styles.container}>
			<ÉtapeFormulaire étape={étape} />
			{ urlÉtapePrécédente && <LinkStyledAsButtonWithIcon
				href={urlÉtapePrécédente}
				appearance="asSecondaryButton"
				iconPosition={'left'}
				icon={<Icon name="angle-left"/>}
				className={styles.boutonRetour}
			>
        Retour à l’étape précédente
			</LinkStyledAsButtonWithIcon>}
			{ children }
		</Container>
	);
}


const ÉtapeFormulaire = (props: {étape: string}) => <div className={styles.étape}>{props.étape}</div>;
