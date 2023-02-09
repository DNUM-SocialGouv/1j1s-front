import styles from '~/client/components/features/Contenu/ConsulterContenu.module.scss';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import Marked from '~/client/components/ui/Marked/Marked';
import markedStyles from '~/client/components/ui/Marked/Marked.module.scss';

export interface ConsulterContenuProps {
  titre: string
  contenu: string
}

export function ConsulterContenu({ titre, contenu }: ConsulterContenuProps) {
	return (
		<main id="contenu">
			<Container>
				<article className={styles.article}>
					<Head
						title={`${titre} | 1jeune1solution`}
						robots="index,follow"
					/>
					<Marked markdown={contenu} className={markedStyles.normalize}/>
				</article>
			</Container>
		</main>
	);
}
