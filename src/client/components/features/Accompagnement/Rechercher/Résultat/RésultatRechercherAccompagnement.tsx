import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import {
	ModalDemandeDeContactAccompagnement,
} from '~/client/components/features/Accompagnement/DemandeDeContact/ModalDemandeDeContactAccompagnement';
import {
	HorairesResultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/Horaires/HorairesResultatRechercherAccompagnement';
import {
	RésultatRechercherAccompagnementTagsList,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementTagsList';
import {
	useAccompagnementLogo,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/useAccompagnementLogo';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Card } from '~/client/components/ui/Card/Card';
import { Link } from '~/client/components/ui/Link/Link';
import {
	EtablissementAccompagnement,
	EtablissementAccompagnementAdresse,
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

import styles from './RésultatRechercherAccompagnement.module.scss';

export interface RésultatRechercherAccompagnementProps {
	etablissement: EtablissementAccompagnement
}

export function RésultatRechercherAccompagnement({ etablissement }: RésultatRechercherAccompagnementProps) {

	const isMissionLocale = etablissement.type === TypeÉtablissement.MISSION_LOCALE;
	const [isPopInOpen, setIsPopInOpen] = useState(false);
	const logoÉtablissement = useAccompagnementLogo(etablissement.type);
	const adresse = etablissement.adresse;

	const openContactÉtablissementModal = useCallback(() => {
		setIsPopInOpen(true);
	}, []);


	function ContactButton() {
		const label = 'Je souhaite être contacté(e)';
		return (
			<>
				<ButtonComponent
					className={classNames(styles.contactFormulaireÉtablissement, styles.contactFormulaireÉtablissementDesktopOnly)}
					label={label}
					appearance={'quaternary'}
					onClick={openContactÉtablissementModal} />

				<ButtonComponent
					className={classNames(styles.contactFormulaireÉtablissement, styles.contactFormulaireÉtablissementMobileOnly)}
					label={label}
					appearance={'primary'}
					onClick={openContactÉtablissementModal} />
			</>
		);
	}

	function MailLink(props: { établissement: EtablissementAccompagnement }) {
		const label = 'Contacter l‘agence';
		const mailTo = `mailto:${props.établissement.email}`;
		const title = `${label} - adresse mail`;

		return (
			<>
				<Link
					appearance={'asQuaternaryButton'}
					href={mailTo}
					className={classNames(styles.contactMailÉtablissement, styles.contactMailÉtablissementDesktop)}
					title={title}>
					{label}
					<Link.Icon name="mail" />
				</Link>
				<Link
					appearance={'asPrimaryButton'}
					href={mailTo}
					className={classNames(styles.contactMailÉtablissement, styles.contactMailÉtablissementMobile)}
					title={title}>
					{label}
					<Link.Icon name="mail" />
				</Link>
			</>
		);
	}

	const Address = ({ address, className }: { address: EtablissementAccompagnementAdresse } & React.HTMLAttributes<HTMLSpanElement>) => {
		return <span className={className}>{`${address.numeroVoie}, ${address.codePostal} ${address.nomCommune}`}</span>;
	};

	return (
		<>
			<Card layout={'vertical'} className={styles.card}>
				<Card.Content className={styles.content}>
					<Card.Image className={styles.logo} src={logoÉtablissement} height={108} width={108} alt="" />
					<div className={styles.mainInfoEtablissement}>
						<Card.Title className={styles.title} titleAs={'h3'}>
							{etablissement.nom}
						</Card.Title>
						{adresse && <Address className={styles.address} address={adresse} />}
					</div>
					<RésultatRechercherAccompagnementTagsList etablissement={etablissement} />

					{etablissement.horaires && etablissement.horaires.length > 0 && (
						<details className={styles.details}>
							<summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
							<div className={styles.horaireBackground}>
								<ol className={styles.listeHoraire}>
									{etablissement.horaires.map((horaire) => (
										<li key={horaire.jour} className={styles.horaireElement}>
											<HorairesResultatRechercherAccompagnement horaire={horaire} />
										</li>
									))}
								</ol>
							</div>
						</details>
					)}

					{
						etablissement.email && (isMissionLocale ? <ContactButton />
							: <MailLink établissement={etablissement} />)
					}
				</Card.Content>
			</Card>
			{
				isMissionLocale && etablissement.email && (
					<ModalDemandeDeContactAccompagnement
						contactÉtablissementAccompagnement={{
							email: etablissement.email,
							nom: etablissement.nom,
							type: etablissement.type,
						}}
						isOpen={isPopInOpen}
						setIsOpen={setIsPopInOpen} />
				)}
		</>
	);
}
