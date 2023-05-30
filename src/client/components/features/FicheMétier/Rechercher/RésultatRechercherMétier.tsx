import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useSanitize from '~/client/hooks/useSanitize';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { mapFicheMetier } from '~/server/fiche-metier/domain/ficheMetierHttp';

export function RésultatRechercherMétier(props: HitProps<Partial<Strapi.CollectionType.FicheMétier>>) {
	const ficheMetier = mapFicheMetier(props.hit);
	const accrocheMétier = useSanitize(ficheMetier.accrocheMetier);
	const nomMetier = useMemo(() => {
		return `${ficheMetier.nomMetier?.charAt(0).toUpperCase()}${ficheMetier.nomMetier?.slice(1)}`;
	}, [ficheMetier.nomMetier]);

	if (!ficheMetier.nomMetier) return null;

	return (
		<Link href={`/decouvrir-les-metiers/${encodeURIComponent(ficheMetier.nomMetier)}`} className={'underline-none'}>
			<Card className={styles.resultatCard} layout={'horizontal'}>
				<Card.Content className={styles.content}>
					<Card.Title className={styles.title} titleAs={'h3'}>{nomMetier}</Card.Title>
					<div className={styles.description} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
					<Card.FakeLink appearance={'quaternary'} className={styles.fakeLink} icon={<Icon name={'angle-right'}/>} label={'En savoir plus'} />
				</Card.Content>
			</Card>
		</Link>
	);
}
