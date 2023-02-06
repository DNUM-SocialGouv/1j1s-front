import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import Marked from '~/client/components/ui/Marked/Marked';

const contenuHeader = `
Votre entreprise recrute ou porte une initiative pour les jeunes ?
==================================================================

Rejoignez la mobilisation !

**La jeunesse est notre priorité.** Partout en France, des entreprises, chacune à leur échelle et selon leurs possibilités, cherchent ou apportent toutes sortes de solutions pour les jeunes. Rejoignez-les, et **bénéficiez de services inédits** : un accompagnement personnalisé si vous le souhaitez, des aides pour communiquer, etc.
`;

export default function RejoignezMobilisation() {
	return <div className={styles.content}>
		<Container className={styles.container} >
			<div className={styles.lesEntreprisesSEngagent}>
				<Image src="/icons/les-entreprises-s-engagent.svg" alt="" width={65} height={65} aria-hidden style={{ height: 65 }} />
				<span>Les entreprises s‘engagent</span>
			</div>
			<Marked markdown={contenuHeader}/>
			<div className={styles.linkAsButtonWrapper}>
				<Link href="/les-entreprises-s-engagent/inscription" appearance="asPrimaryButton">Rejoindre la mobilisation</Link>
				<Link href="https://lesentreprises-sengagent.gouv.fr/les-entreprises-engagees" appearance="asSecondaryButton">Découvrir les entreprises engagées</Link>
			</div>
		</Container>
	</div>;
}
