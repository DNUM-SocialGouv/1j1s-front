import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';

import styles from './LightHero.module.scss';

interface LightHeroProps {
	primaryText: string
	secondaryText?: string
}

export function LightHero({ primaryText, secondaryText }: LightHeroProps) {
  return (
    <Container className={styles.hero}>
      <h1 className={styles.heroTitle}>
        <span className={styles.heroTitlePrimaryText}>{primaryText}</span>
        {secondaryText && <span className={styles.heroTitleSecondaryText}>{secondaryText}</span>}
      </h1>
    </Container>
  );
} 
