import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps {
  image?: string
}

export function Hero({ children, image, ...rest }: React.PropsWithChildren<HeroProps>) {
  const { isXLargeScreen } = useBreakpoint();

  return (
    <div className={styles.hero} {...rest}>
      <div className={styles.heroContent}>
        <span className={styles.heroTitle}>
          <h1>
            {children}
          </h1>
        </span>
      </div>
      {image && isXLargeScreen && (
        <div className={styles.heroImage}>
          <Image src={image} alt="" layout="fill" objectFit="contain" objectPosition="right"/>
        </div>
      )}
    </div>
  );
}
