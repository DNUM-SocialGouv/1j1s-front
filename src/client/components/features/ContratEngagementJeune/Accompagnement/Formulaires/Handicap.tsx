import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

export default function Handicap({ setTypeFormulaireAffiché, setIsInscriptionPôleEmploiModalOpen }: FormulairesProps ) {
	return <>
		<button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide26ans')}>
			<TextIcon icon="angle-left" iconPosition="left">Retour</TextIcon>
		</button>
		<p className={styles.accompagnementQuestion}>Êtes-vous en situation de handicap (RQTH) ?</p>
		<div>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('AutresBesoins26ans')}>Oui</button>
			<button className={styles.optionBouton} onClick={() => setIsInscriptionPôleEmploiModalOpen(true)}>Non</button>
		</div>
	</>;
}
