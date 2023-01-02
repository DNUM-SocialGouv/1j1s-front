import classNames from 'classnames';
import React, { useState } from 'react';

import {
	ModalDemandeDeContactCEJ,
} from '~/client/components/features/ContratEngagementJeune/Rappel/ModalDemandeDeContactCEJ/ModalDemandeDeContactCEJ';
import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import Marked from '~/client/components/ui/Marked/Marked';

export default function Rappel() {
	const [isPopInOpen, setIsPopInOpen] = useState(false);

	return (
		<div className={classNames(styles.rappel, 'background-white-lilac')}>
			<Container className={styles.rappelContainer}>
				<Marked markdown={'## J‘ai des questions sur le Contrat d‘Engagement Jeune'}/>
				<ButtonComponent label='Je souhaite être contacté(e)' icon={<Icon name={'angle-right'}/>} onClick={() => setIsPopInOpen(true)} />
			</Container>
			<ModalDemandeDeContactCEJ
				isOpen={isPopInOpen}
				setIsOpen={setIsPopInOpen}
			/>
		</div>
	);
}
