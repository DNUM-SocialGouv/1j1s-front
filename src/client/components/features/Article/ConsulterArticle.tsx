import classNames from 'classnames';

import styles from '~/client/components/features/Article/ConsulterArticle.module.scss';
import { ButtonRetour } from '~/client/components/features/ButtonRetour/ButtonRetour';
import { Icon } from '~/client/components/ui/Icon/Icon';
import Marked from '~/client/components/ui/Marked/Marked';
import MarkedStyles from '~/client/components/ui/Marked/Marked.module.scss';
import useSanitize from '~/client/hooks/useSanitize';
import { Article } from '~/server/cms/domain/article';

interface ConsulterArticleProps {
  article: Article
}

export function ConsulterArticle({ article }: ConsulterArticleProps) {
	const titre = useSanitize(article.titre);
	const bannièreSrc = useSanitize(article.bannière?.src);
	const bannièreAlt = useSanitize(article.bannière?.alt);
	const contenu = article.contenu ;

	return (
		<>
			<main className={classNames('fr-container', styles.consulterArticle)}>
				<ButtonRetour 
					className={styles.consulterArticleButtonRetour} 					
					icon={<Icon name="angle-left" />}
					iconPosition="left"
					label="Retour"
				/>
				<h1 className={styles.titre}>{titre}</h1>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{bannièreSrc && <img src={bannièreSrc} alt={bannièreAlt} decoding="async" loading="lazy" />}
				<Marked markdown={contenu} className={classNames(styles.contenu, MarkedStyles.normalize)} />
			</main>
		</>
	);
}
