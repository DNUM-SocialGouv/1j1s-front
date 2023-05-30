import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText } from '~/client/components/ui/Hero/LightHero';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export default function RejoignezMobilisation() {
	return <div className={styles.content}>
		<Container className={styles.container}>
			<div className={styles.lesEntreprisesSEngagent}>
				<Image src="/icons/les-entreprises-s-engagent.svg" alt="" width={65} height={65}/>
				<span className={styles.lesEntreprisesSEngagentTitle}>Les entreprises s‘engagent</span>
			</div>
			<LightHero className={styles.initiativeJeuneTitle}>
				<h1>
					<div className={styles.initiativeJeuneQuestion}>Votre entreprise recrute ou porte une initiative pour les jeunes ?</div>
					<LightHeroPrimaryText>Rejoignez la mobilisation !</LightHeroPrimaryText>
				</h1>
			</LightHero>
			<p className={styles.description}>
				<b>La jeunesse est notre priorité.</b> Partout en France, des entreprises, chacune à leur échelle et selon leurs
				possibilités, cherchent ou apportent toutes sortes de solutions pour les jeunes. Rejoignez-les, et <b>bénéficiez
				de services inédits</b> : un accompagnement personnalisé si vous le souhaitez, des aides pour communiquer, etc.
			</p>
			<div className={styles.linkAsButtonWrapper}>
				<LinkStyledAsButton href="/les-entreprises-s-engagent/inscription" appearance="asPrimaryButton">Rejoindre la
					mobilisation</LinkStyledAsButton>
				<LinkStyledAsButton href="https://lesentreprises-sengagent.gouv.fr/les-entreprises-engagees" appearance="asSecondaryButton">
					Découvrir les entreprises engagées
				</LinkStyledAsButton>
			</div>
		</Container>
	</div>;
}
