import styles
	from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnement.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Tag } from '~/client/components/ui/Tag/Tag';
import {
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

interface tagsListProps {
	etablissement: ÉtablissementAccompagnement
}

export function RésultatRechercherAccompagnementTagsList({ etablissement }: tagsListProps) {
	const isMissionLocale = etablissement.type === TypeÉtablissement.MISSION_LOCALE;

	return <ul className={styles.tags}>
		{etablissement.telephone &&
			<li key={'téléphone'} aria-label={'téléphone de l‘établissement'}>
				<Tag>
					<Link href={`tel:${etablissement.telephone}`} className={styles.telephone}>
						<Icon name={'phone'}/>{etablissement.telephone}
					</Link>
				</Tag>
			</li>}
		{!isMissionLocale && etablissement.email &&
			<li key={'mail'} aria-label={'email de l‘établissement'}>
				<Tag>{etablissement.email}</Tag>
			</li>}
	</ul>;
}
