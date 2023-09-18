import { Container } from '~/client/components/layouts/Container/Container';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from '../EmploiEnEuropeContent.module.scss';

export function AidesFinancieres() {
	return (
		<div>
			<Container className={styles.sectionAidesFinancieres}>
				<h2>Je cherche des aides financières pour vivre une expérience en Europe</h2>
				<div className={styles.buttonWrapper}>
					<LinkStyledAsButton href="/mes-aides" appearance="asPrimaryButton">Faire une simulation d’aides</LinkStyledAsButton>
				</div>
			</Container>
		</div>
	);
}
