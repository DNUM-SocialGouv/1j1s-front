import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/PourQui/PourQui.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Link } from '~/client/components/ui/Link/Link';

export function PourQui() {
	return (
		<div className={styles.pourqui}>
			<Container className={styles.container}>
				<LightHero className={styles.title}>
					<h1>
						<LightHeroPrimaryText>
							1 jeune 1 mentor, accompagner un jeune pour l‘aider à réussir
						</LightHeroPrimaryText>
					</h1>
					<LightHeroSecondaryText>Faites la rencontre qui change tout !</LightHeroSecondaryText>
				</LightHero>
				<div className={styles.contenu}>
					<dl>
						<dt>
							Vous êtes employeur ou citoyen et souhaitez devenir mentor ?
						</dt>
						<dd>
							Embarquer dans une aventure humaine hors du commun, pour partager votre expérience, favoriser l‘égalité des
							chances et continuer à apprendre en accompagnant un jeune.
						</dd>
						<dt>
							Votre entreprise recrute ou porte une initiative pour les jeunes ? Rejoignez la mobilisation !
						</dt>
						<dd>
							Permettez à votre entreprise d’apporter des solutions pour les jeunes, rejoignez des milliers d’entreprises
							déjà engagées et bénéficiez de services inédits.
						</dd>
					</dl>
				</div>
				<div className={styles.linkWrapper}>
					<Link href="https://www.1jeune1mentor.fr/formulaire-mentor?1jeune1solution" appearance="asPrimaryButton">Devenir mentor</Link>
					<Link href="/les-entreprises-s-engagent" appearance="asSecondaryButton">Engager mon entreprise</Link>
				</div>
			</Container>
		</div>);
}
