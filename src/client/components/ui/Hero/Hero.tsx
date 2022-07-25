import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/ui/Hero/Hero.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps {
  image?: string
}

export function Hero({ children, image, ...rest }: React.PropsWithChildren<HeroProps>) {
  const { isLargeScreen } = useBreakpoint();

  return (
    <div className={styles.hero} {...rest}>
      <Container className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {children}
        </h1>
        {image && isLargeScreen && (
          <div className={styles.heroIllustration}>
            <Image src={image} alt="" layout="fill" objectFit="cover" objectPosition="top left"/>
          </div>
        )}
      </Container>
    </div>
  );
}
