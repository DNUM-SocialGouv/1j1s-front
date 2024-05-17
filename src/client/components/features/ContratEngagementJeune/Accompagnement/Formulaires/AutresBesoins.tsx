import React, { useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './AccompagnementFormulaireCommon.module.scss';

type AutresBesoinsProps = Pick<FormulairesProps, 'setTypeFormulaireAffiché' | 'setIsMissionLocaleModalOpen' | 'setIsInscriptionFranceTravailModalOpen'>

export default function AutresBesoins({
	setTypeFormulaireAffiché,
	setIsMissionLocaleModalOpen,
	setIsInscriptionFranceTravailModalOpen,
}: AutresBesoinsProps) {
	const [activeCounter, setActiveCounter] = useState(0);


	function BoutonAutreBesoin(placeholder: string) {
		const [isActive, setActive] = useState(false);

		const toggleClass = () => {
			setActive(!isActive);
			if (!isActive) {
				setActiveCounter(activeCounter + 1);
			} else {
				setActiveCounter(activeCounter - 1);
			}

		};
		return <button
			onClick={toggleClass}
			className={isActive ? styles.accompagnementIsActive : styles.accompagnementDesactive}>
			{placeholder}
		</button>;
	}

	return <>
		<ButtonComponent
			appearance={'quaternary'}
			className={styles.boutonRetour}
			onClick={() => setTypeFormulaireAffiché('BesoinAide')}
			label="Retour"
			icon={<Icon name={'angle-left'}/>}
			iconPosition={'left'}/>
		<p className={styles.question}>Rencontrez-vous d’autres besoins ?</p>
		<div className={styles.autresBesoinsContainer}>
			{BoutonAutreBesoin('Logement')}
			{BoutonAutreBesoin('Santé')}
			{BoutonAutreBesoin('Difficultés administratives ou juridiques')}
			{BoutonAutreBesoin('Problématique d‘accès aux droits')}
			{BoutonAutreBesoin('Maîtrise de français')}
			{BoutonAutreBesoin('Contraintes familiales')}
		</div>
		<div className={styles.accompagnementValider}>
			{activeCounter > 0
				? <ButtonComponent label="Valider" onClick={() => setIsMissionLocaleModalOpen(true)}/>
				: <ButtonComponent label="Valider" onClick={() => setIsInscriptionFranceTravailModalOpen(true)}/>
			}
		</div>
	</>;
}
