import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { TOP_ELEMENT_ID } from '~/client/components/ui/Bouée/Bouée';
import styles from '~/client/components/ui/SkipLink/SkipLink.module.scss';

export default function SkipLink() {
	return (
		<div className={styles.skipLinkWrapper}>
			<Container>
				<ul className={styles.skipLinkList} id={TOP_ELEMENT_ID} tabIndex={-1}>
					<li><a className={styles.skipLink} href="#contenu">Contenu</a></li>
					<li><a className={styles.skipLink} href="#header-navigation">Menu</a></li>
					<li><a className={styles.skipLink} href="#footer">Pied de page</a></li>
				</ul>
			</Container>
		</div>
	);
}
