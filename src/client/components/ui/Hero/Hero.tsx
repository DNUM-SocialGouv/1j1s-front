import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.css';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps {
  image?: string
}

export function Hero({ children, image, ...rest }: React.PropsWithChildren<HeroProps>) {
  const { isSmallScreen } = useBreakpoint();

  return (
    <div className={styles.hero} {...rest}>
      <div className={styles.heroContent}>
        {children}
      </div>
      {image && !isSmallScreen && (
        <div className={styles.heroImage}>
          <Image src={image} alt="" layout="fill" objectFit="cover" />
        </div>
      )}
    </div>
  );
}
