import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

type DemarrageProps = Pick<FormulairesProps, 'setTypeFormulaireAffiché' | 'setIsFranceTravailModalOpen' | 'setIsMissionLocaleModalOpen'>
export default function Démarrage({ setTypeFormulaireAffiché, setIsFranceTravailModalOpen, setIsMissionLocaleModalOpen }: DemarrageProps) {
	const { isSmallScreen, isMediumScreen } = useBreakpoint();
	const isMobile = isSmallScreen || isMediumScreen;

	return <>
		<p className={styles.accompagnementQuestion}>Bénéficiez-vous actuellement d‘un accompagnement ?</p>
		<div>
			{isMobile && <span>Sélectionnez l‘option qui vous correspond :</span>}
			<button className={styles.optionBouton} onClick={() => setIsMissionLocaleModalOpen(true)}>
				Oui, je suis accompagné(e) par la Mission Locale
			</button>
			<button className={styles.optionBouton} onClick={() => setIsFranceTravailModalOpen(true)}>
				Oui, je suis accompagné(e) par France Travail
			</button>
			<button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('PasDAccompagnement')}>
				Non, je ne bénéficie d‘aucun accompagnement
			</button>
		</div>
	</>;
}
