import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.css';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps {
  image?: string
}

export function Hero({ children, image, ...rest }: React.PropsWithChildren<HeroProps>) {
  const { isLargeScreen } = useBreakpoint();

  return (
    <div className={styles.hero} {...rest}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {children}
        </h1>
      </div>
      {image && isLargeScreen && (
        <div className={styles.heroImage}>
          <Image src={image} alt="" layout="fill" objectFit="contain" objectPosition="right"/>
        </div>
      )}
    </div>
  );
}
