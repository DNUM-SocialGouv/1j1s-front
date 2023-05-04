import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles.module.scss';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export default function AidesExceptionnelles() {

	return (
		<section className={styles.aides}>
			<div className={styles.aidesContainer}>
				<h2 className={styles.aidesContainerTitre}>Les entreprises s’engagent,
					<span className={styles.aidesContainerTitreAccroche}> une mobilisation des entreprises pour l’emploi des jeunes</span>
				</h2>
				<LinkStyledAsButton href="/les-entreprises-s-engagent" appearance='asSecondaryButton'>Rejoindre la mobilisation</LinkStyledAsButton>
			</div>
		</section>
	);
}
