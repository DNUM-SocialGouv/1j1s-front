import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { HtmlHeadingTag } from '~/client/components/props';

import styles from './LightHero.module.scss';

interface LightHeroProps {
	primaryText: string
	secondaryText?: string
  titleLevel?: HtmlHeadingTag
}

export function LightHero({ primaryText, secondaryText, titleLevel }: LightHeroProps) {

  function Title() {
    return React.createElement(titleLevel || 'h1', { className: styles.heroTitle },
      <>
        <span className={styles.heroTitlePrimaryText}>{primaryText}</span>
        {secondaryText && <span className={styles.heroTitleSecondaryText}>{secondaryText}</span>}
      </>,
    );
  }

  return (
    <Container>
      <Title/>
    </Container>
  );
} 
