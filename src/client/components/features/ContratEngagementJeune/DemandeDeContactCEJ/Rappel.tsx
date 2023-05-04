import classNames from 'classnames';
import React, { useState } from 'react';

import {
	Modal,
} from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Modal/Modal';
import styles from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Rappel.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';

export default function Rappel() {
	const [isPopInOpen, setIsPopInOpen] = useState(false);

	return (
		<div className={classNames(styles.rappel, 'background-white-lilac')}>
			<Container className={styles.rappelContainer}>
				<h2>J‘ai des questions sur le Contrat d‘Engagement Jeune</h2>
				<ButtonComponent label='Demander à être contacté.e' onClick={() => setIsPopInOpen(true)} />
			</Container>
			<Modal
				isOpen={isPopInOpen}
				setIsOpen={setIsPopInOpen}
			/>
		</div>
	);
}
