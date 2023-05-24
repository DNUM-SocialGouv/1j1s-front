import React from 'react';

import styles from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeursEtApprentissage/DecouvrirMesuresEmployeursEtApprentissage.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export default function DecouvrirMesuresEmployeursEtApprentissage() {
	return (
		<section className={styles.section}>
			<Container className={styles.sectionBox}>
				<div className={styles.sectionBoxContainer}>
					<span className={ styles.sectionBoxContainerText }>
						<Icon name={'brief-case'} className={styles.sectionBoxContainerTextIcon}/>
						<h2 className={styles.sectionBoxContainerTextTitre}>Découvrez les mesures du plan 1jeune1solution pour
							<span className={styles.sectionBoxContainerTextTitreAccroche}> vous aider à recruter plus facilement</span>
						</h2>
						<LinkStyledAsButton href="/mesures-employeurs" appearance="asSecondaryButton">Découvrir les mesures employeurs</LinkStyledAsButton>
					</span>
				</div>
				<div className={styles.sectionBoxContainer}>
					<span className={ styles.sectionBoxContainerText }>
						<Icon name={'award'} className={styles.sectionBoxContainerTextIcon}/>
						<h2 className={styles.sectionBoxContainerTextTitre}>Découvrez l’apprentissage,
							<span className={styles.sectionBoxContainerTextTitreAccroche}> le bon choix pour votre entreprise</span>
						</h2>
						<p className={styles.sectionBoxContainerTextDescription}>Les avantages, les coûts, des témoignages de jeunes ayant fait l’expérience de l’apprentissage, des conseils pratiques...</p>
						<LinkStyledAsButton href="/apprentissage-entreprises" appearance="asSecondaryButton">Découvrir l’apprentissage</LinkStyledAsButton>
					</span>
				</div>
			</Container>
		</section>
	);
}
