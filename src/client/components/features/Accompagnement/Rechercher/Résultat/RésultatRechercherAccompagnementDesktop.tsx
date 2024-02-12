import React from 'react';

import {
	HorairesRésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/Horaires/HorairesRésultatRechercherAccompagnement';
import styles
	from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnement.module.scss';
import {
	RésultatRechercherAccompagnementTagsList,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementTagsList';
import {
	useAccompagnementLogo,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/useAccompagnementLogo';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import {
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

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
							<RésultatRechercherAccompagnementTagsList etablissement={établissement} />
						</div>
						{
							établissement.email && !isMissionLocale &&
							<LinkStyledAsButtonWithIcon
								appearance={'asQuaternaryButton'}
								icon={<Icon name={'mail'}/>}
								iconPosition={'right'}
								href={`mailto:${établissement.email}`}
								className={styles.contactMailÉtablissement}
								title="Contacter l‘agence - adresse mail">
								Contacter l‘agence
							</LinkStyledAsButtonWithIcon>
						}
						{
							établissement.email && isMissionLocale &&
							<ButtonComponent
								className={styles.contactFormulaireÉtablissement}
								label={'Je souhaite être contacté(e)'}
								appearance={'quaternary'}
								onClick={onContactClick}/>
						}
					</div>
					{établissement.horaires && établissement.horaires.length > 0 &&
						<details className={styles.details}>
							<summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
							<div className={styles.horaireBackground}>
								<ol className={styles.listeHoraire}>
									{établissement.horaires.map((horaire) => (
										<li key={horaire.jour} className={styles.horaireElement}>
											<HorairesRésultatRechercherAccompagnement horaire={horaire}/>
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
