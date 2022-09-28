import classNames from 'classnames';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import {
  CommonProps,
  HtmlHeadingTag,
} from '~/client/components/props';

import styles from './LightHero.module.scss';

interface LightHeroProps extends CommonProps{
	primaryText: string
	secondaryText?: string
  titleLevel?: HtmlHeadingTag
}

export function LightHero({ primaryText, secondaryText, titleLevel, className }: LightHeroProps) {

  function Title() {
    return React.createElement(titleLevel || 'h1', { className: classNames(styles.heroTitle, className ) },
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
