import React from 'react';

import {
	HorairesRésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/Horaires/HorairesRésultatRechercherAccompagnement';
import styles
	from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnement.module.scss';
import { useAccompagnementLogo } from '~/client/components/features/Accompagnement/Rechercher/Résultat/useAccompagnementLogo';
import { ButtonAsLink } from '~/client/components/ui/ButtonAsLink/ButtonAsLink';
import { Card } from '~/client/components/ui/Card/Card';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import {
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

interface RésultatRechercherAccompagnementDesktopProps {
  établissement: ÉtablissementAccompagnement
  onContactClick(): void
}

export function RésultatRechercherAccompagnementDesktop(props: RésultatRechercherAccompagnementDesktopProps) {
	const {
		établissement,
		onContactClick,
	} = props;

	const isMissionLocale = établissement.type === TypeÉtablissement.MISSION_LOCALE;
	const logoÉtablissement = useAccompagnementLogo(établissement.type);

	return (
		<>
			<Card layout={'vertical'} className={styles.card}>
				<Card.Content className={styles.content}>
					<Card.Image className={styles.logo} src={logoÉtablissement} aria-hidden/>
					<div className={styles.mainContent}>
						<div className={styles.logoAlignment}>
							<Card.Title className={styles.title} titleAs={'h3'}>
								{établissement.nom}
							</Card.Title>
							{établissement.adresse && <span className={styles.address}>{établissement.adresse}</span>}
							<TagList list={[établissement.telephone, établissement.email]} className={styles.tags}/>
						</div>
						{
							établissement.email && !isMissionLocale &&
              <a href={`mailto:${établissement.email}`} className={styles.contactMailÉtablissement}>
              	<TextIcon icon={'mail'} iconPosition={'right'}>Contacter l‘agence</TextIcon>
              </a>
						}
						{
							établissement.email && isMissionLocale &&
              <ButtonAsLink className={styles.contactFormulaireÉtablissement} onClick={onContactClick}>
                Je souhaite être rappelé
              </ButtonAsLink>
						}
					</div>
					{établissement.horaires &&
            <details className={styles.details}>
            	<summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
            	<div className={styles.horaireBackground}>
            		<ol className={styles.listeHoraire}>
            			{établissement.horaires.map((horaire) => (
            				<li key={horaire.jour} className={styles.horaireElement}>
            					<HorairesRésultatRechercherAccompagnement horaire={horaire} />
            				</li>
            			))}
            		</ol>
            	</div>
            </details>
					}
				</Card.Content>
			</Card>
		</>
	);
}
