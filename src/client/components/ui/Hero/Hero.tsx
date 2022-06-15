import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.css';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps {
  image?: string
}

export function Hero({ children, image, ...rest }: React.PropsWithChildren<HeroProps>) {
  const { isExtraLargeScreen } = useBreakpoint();

  return (
    <div className={styles.hero} {...rest}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          {children}
        </div>
      </div>
      {image && isExtraLargeScreen && (
        <img className={styles.heroImage} src={image} alt=""/>
      )}
    </div>
  );
}
