import React from 'react';

import {
	HorairesRésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/Horaires/HorairesRésultatRechercherAccompagnement';
import styles
	from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnement.module.scss';
import { useAccompagnementLogo } from '~/client/components/features/Accompagnement/Rechercher/Résultat/useAccompagnementLogo';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Card } from '~/client/components/ui/Card/Card';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

interface RésultatRechercherAccompagnementMobileProps {
  établissement: ÉtablissementAccompagnement
  onContactClick(): void
}

export function RésultatRechercherAccompagnementMobile(props: RésultatRechercherAccompagnementMobileProps) {
	const {
		établissement,
		onContactClick,
	} = props;

	const isMissionLocale = établissement.type === TypeÉtablissement.MISSION_LOCALE;
	const logoÉtablissement = useAccompagnementLogo(établissement.type);

	return (
		<Card layout={'vertical'} className={styles.card}>
			<Card.Content className={styles.content}>
				<Card.Image className={styles.logo} src={logoÉtablissement} aria-hidden/>
				<div className={styles.mainContent}>
					<Card.Title className={styles.title} titleAs={'h3'}>
						{établissement.nom}
					</Card.Title>
					{établissement.adresse && <span className={styles.address}>{établissement.adresse}</span>}
				</div>
			</Card.Content>
			<TagList list={[établissement.telephone, !isMissionLocale ? établissement.email : '']} className={styles.tags}/>
			{
				établissement.email && !isMissionLocale &&
				<Link className={styles.contactFormulaireÉtablissement} href={établissement.email} appearance={'asPrimaryButton'}>Contacter l‘agence</Link>
			}
			{
				établissement.email && isMissionLocale &&
        <ButtonComponent label={'Je souhaite être contacté(e)'} className={styles.contactFormulaireÉtablissement} onClick={onContactClick} />
			}
			<details className={styles.details}>
				<summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
				<ol className={styles.listeHoraire}>
					{établissement.horaires?.map((horaire) => (
						<li key={horaire.jour} className={styles.horaireElement}>
							<HorairesRésultatRechercherAccompagnement horaire={horaire} />
						</li>
					))}
				</ol>
			</details>
		</Card>
	);
}
