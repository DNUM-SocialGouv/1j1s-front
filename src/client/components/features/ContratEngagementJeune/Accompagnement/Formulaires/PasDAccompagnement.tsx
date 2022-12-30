import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function PasDAccompagnement({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen }: FormulairesProps) {
	const { isSmallScreen, isMediumScreen } = useBreakpoint();
	const isMobile = isSmallScreen || isMediumScreen;

	return <>
		<button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('Démarrage')}>
			<TextIcon icon="angle-left" iconPosition="left">Retour</TextIcon>
		</button>
		<p className={styles.accompagnementQuestion}>Quel âge avez-vous ?</p>
		<div>
			{isMobile && <span>Sélectionnez l‘option qui vous correspond :</span>}
			<button className={styles.optionBouton} onClick={() => setIsMissionLocaleModalOpen(true)}>Moins de 18 ans</button>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('BesoinAide') }>Entre 18 et 25 ans</button>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('BesoinAide26ans') }>Plus de 25 ans</button>
		</div>
	</>;
}
