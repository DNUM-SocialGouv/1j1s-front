import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/ui/SkipLink/SkipLink.module.scss';

export default function SkipLink() {
	return (
		<div className={styles.skipLinkWrapper}>
			<Container>
				<ul className={styles.skipLinkList}>
					<li><a className={styles.skipLink} href="#contenu">Contenu</a></li>
					<li><a className={styles.skipLink} href="#header-navigation">Menu</a></li>
					<li><a className={styles.skipLink} href="#footer">Pied de page</a></li>
				</ul>
			</Container>
		</div>
	);
}
