import { ArticleCard } from '~/client/components/ui/Card/Article/ArticleCard';
import { Actualite } from '~/server/actualites/domain/actualite';
import { getExtraitContenu } from '~/server/cms/infra/repositories/strapi.utils';

import styles from './ActualiteCard.module.scss';

type ActualiteCardProps = {
	actualite: Actualite
};

export default function ActualiteCard({ actualite }: ActualiteCardProps) {
	// FIXME (GAFI 14-11-2024): Passer plutôt par actualite.lien, actualite.article n'est pas utilisé dans le composant
	//	ou bien utiliser actualite.article.slug dans le composant
	const isExternalLink = actualite.article == null;

	const extrait = getExtraitContenu(actualite.contenu);

	return (
		<ArticleCard
			imageSrc={actualite.bannière?.src || ''}
			titleLabel={actualite.titre}
			link={actualite.link}
			linkLabel={isExternalLink ? 'En savoir plus' : undefined}
			iconName={isExternalLink ? 'external-redirection' : undefined}
			// FIXME (GAFI 14-11-2024): À variabiliser ?
			titleHeadingTag={'h2'}
			className={styles.card}>
			{/* // FIXME (GAFI 14-11-2024): Checker si on a toujours besoin de article.extraitContenu maintenant que c'est sur le front  */}
			<p>{extrait}</p>
		</ArticleCard>
	);
}
