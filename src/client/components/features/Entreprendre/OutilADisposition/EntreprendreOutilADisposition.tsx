import React from 'react';

import styles from '~/client/components/features/Entreprendre/OutilADisposition/EntreprendreOutilADisposition.module.scss';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

interface EntreprendreOutilADispositionProps {
  link: string
  linkLabel: string
  description: string
}

export function EntreprendreOutilADisposition({ link, linkLabel, description }: EntreprendreOutilADispositionProps) {
	return (
		<div className={styles.entreprendreOutilADisposition}>
			<p>{description}</p>
			<LinkStyledAsButton appearance="asPrimaryButton" href={link}>
				{linkLabel}
			</LinkStyledAsButton>
		</div>
	);
}
