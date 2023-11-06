import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	Hero,
	HeroPrimaryText,
	HeroSecondaryText } from '~/client/components/ui/Hero/Hero';

import styles from './index.module.scss';

export default function UnJeuneUnpermis() {

	return (
		<main id="contenu">
			<Head
				title={'1jeune1permis | 1jeune1solution'}
				robots="index,follow"
			/>
			<Hero>
				<h1><HeroPrimaryText>1jeune1permis</HeroPrimaryText></h1>
				<HeroSecondaryText>
					En partenariat avec Pôle emploi
				</HeroSecondaryText>
			</Hero>
			<Container>
				<iframe className={styles.iframe}
					title="Informations sur le dispositif 1 jeune 1 permis"
					src={'https://mes-aides.pole-emploi.fr/export/1-jeune-1-permis'}/>
			</Container>
		</main>
	);
}


