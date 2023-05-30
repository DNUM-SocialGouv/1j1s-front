import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export default function DecouvrirMesuresEmployeurs() {
	return (
		<section className={ styles.section }>
			<Container className={ styles.sectionContainer }>
				<Image src="/icons/decouverteMesuresEmployeurs.svg" width={480} height={480} alt='' />
				<span className={ styles.sectionContainerText }>
					<h2 className={styles.sectionContainerTextTitre}>Découvrez les mesures du plan 1jeune1solution pour vous aider
						<span className={styles.sectionContainerTextTitreAccroche}> à recruter plus facilement</span>
					</h2>
					<LinkStyledAsButton href="/mesures-employeurs" appearance="asSecondaryButton">Découvrir toutes les mesures employeurs</LinkStyledAsButton>
				</span>
			</Container>
		</section>
	);
}
