import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

export default function BesoinAide({ setTypeFormulaireAffiché, setIsDispositifsReferencesModalOpen }: FormulairesProps ) {
	return <>
		<button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('PasDAccompagnement')}>
			<TextIcon icon="angle-left" iconPosition="left">Retour</TextIcon>
		</button>
		<p className={styles.accompagnementQuestion}>Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?</p>
		<div>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('AutresBesoins')}>Oui</button>
			<button className={styles.optionBouton} onClick={() => setIsDispositifsReferencesModalOpen(true)}>Non</button>
		</div>
	</>;
}
