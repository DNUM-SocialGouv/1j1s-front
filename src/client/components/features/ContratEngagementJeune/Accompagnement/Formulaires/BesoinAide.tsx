import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './AccompagnementFormulaireCommon.module.scss';

type BesoinAideProps = Pick<FormulairesProps, 'setTypeFormulaireAffiché' | 'setIsDispositifsReferencesModalOpen' >
export default function BesoinAide({ setTypeFormulaireAffiché, setIsDispositifsReferencesModalOpen }: BesoinAideProps ) {
	return <>
		<ButtonComponent
			appearance={'quaternary'}
			className={styles.boutonRetour}
			onClick={() => setTypeFormulaireAffiché('PasDAccompagnement')}
			label="Retour"
			icon={<Icon name={'angle-left'}/>}
			iconPosition={'left'}
		/>
		<p className={styles.question}>Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?</p>
		<div>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('AutresBesoins')}>Oui</button>
			<button className={styles.optionBouton} onClick={() => setIsDispositifsReferencesModalOpen(true)}>Non</button>
		</div>
	</>;
}
