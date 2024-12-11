import { Card } from '~/client/components/ui/Card/Card';
import { Link } from '~/client/components/ui/Link/Link';
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
		<Card className={styles.card} layout={'vertical'}>
			{actualite.bannière && (
				<Card.Image
					src={actualite.bannière.src}
					alt={actualite.bannière.alt}
					className={styles.imgWrapper}
					width={320}
					height={180} />
			)}
			<Card.Content className={styles.content}>
				<Card.Title className={styles.title} titleAs={'h2'}>{actualite.titre}</Card.Title>
				{extrait}
				<Link appearance={'asQuaternaryButton'} href={actualite.link}>
					{isExternalLink ? 'En savoir plus' : "Lire l'article"}
					<Link.Icon />
				</Link>
			</Card.Content>
		</Card>
	);
}
