import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/Objectifs/Objectifs.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { FoldingSection } from '~/client/components/ui/FoldingSection/FoldingSection';

export function Objectifs () {
	return (
		<Container className={styles.objectifsContainer}>
			<FoldingSection  summary={'test'} summaryAs="h2">
				Je suis le test
			</FoldingSection>
		</Container>
	);
}
