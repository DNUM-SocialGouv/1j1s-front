import React from 'react';
import { Container } from 'src/client/components/layouts/Container/Container';
import { Tuile } from 'src/client/components/ui/Tuile/Tuile';

import styles from '~/client/components/features/CampagneApprentissage/RaisonsDeChoisirApprentissage/RaisonsDeChoisirApprentissage.module.scss';
import { IconName } from '~/client/components/ui/Icon/Icon';

export interface Raisons {
	iconName: IconName;
	text: string;
}

interface RaisonsDeChoisirApprentissageProps {
	titre: string;
	raisons: Raisons[];
}

export function RaisonsDeChoisirApprentissage(props: RaisonsDeChoisirApprentissageProps) {
	const { titre, raisons } = props;

	return <section aria-labelledby={'titre-section-raisons'} className={styles.raisons}>
		<Container>
			<h2 id={'titre-section-raisons'}>{titre}</h2>
			<ul>
				{raisons.map((raison, index) => (
					<li key={index}>
						<Tuile iconName={raison.iconName} className={styles.tuile}>
							{raison.text}
						</Tuile>
					</li>
				))}
			</ul>
		</Container>
	</section>;
}
