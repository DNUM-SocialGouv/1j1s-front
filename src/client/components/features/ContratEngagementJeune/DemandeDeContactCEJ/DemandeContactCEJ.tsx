import classNames from 'classnames';
import React, { useState } from 'react';

import styles from './DemandeContactCEJ.module.scss';
import { Container } from '../../../layouts/Container/Container';
import { ButtonComponent } from '../../../ui/Button/ButtonComponent';
import {
	ModaleDemandeContactCEJ
} from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/ModaleDemandeContactCEJ/ModaleDemandeContactCEJ';

export default function DemandeContactCEJ() {
	const [isPopInOpen, setIsPopInOpen] = useState(false);

	return (
		<div className={classNames(styles.rappel, 'background-white-lilac')}>
			<Container className={styles.rappelContainer}>
				<h2>J‘ai des questions sur le Contrat d‘Engagement Jeune</h2>
				<ButtonComponent label='Demander à être contacté.e' onClick={() => setIsPopInOpen(true)} />
			</Container>
			<ModaleDemandeContactCEJ
				isOpen={isPopInOpen}
				setIsOpen={setIsPopInOpen}
			/>
		</div>
	);
}
