import classNames from 'classnames';

import styles from '~/client/components/features/Article/ConsulterArticle.module.scss';
import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import MarkdownToHtml from '~/client/components/ui/Markdown-it/MarkdownToHtml';
import MarkedStyles from '~/client/components/ui/Markdown-it/MarkdownToHtml.module.scss';
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
				<BackButton className={styles.consulterArticleButtonRetour}/>
				<h1 className={styles.titre}>{titre}</h1>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{bannièreSrc && <img src={bannièreSrc} alt={bannièreAlt} decoding="async" loading="lazy" />}
				<MarkdownToHtml markdown={contenu} className={classNames(styles.contenu, MarkedStyles.normalize)} />
			</main>
		</>
	);
}
