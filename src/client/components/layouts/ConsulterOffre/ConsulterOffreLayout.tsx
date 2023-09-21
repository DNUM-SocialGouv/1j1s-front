import React from 'react';

import { ButtonRetour } from '~/client/components/features/ButtonRetour/ButtonRetour';
import styles from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface ConsulterOffreLayoutProps {
  children: React.ReactNode;
}

export function ConsulterOffreLayout(props: React.PropsWithChildren<ConsulterOffreLayoutProps>) {
	const { children } = props;

	return (
		<main id="contenu" className={styles.container}>
			<ButtonRetour
				className={styles.layoutButton}
				icon={<Icon name="angle-left" />}
				iconPosition="left"
				label="Retour"
			/>
			<Container className={styles.layoutContainer}>
				<article className={styles.layout}>
					{children}
				</article>
			</Container>
		</main>
	);
}
