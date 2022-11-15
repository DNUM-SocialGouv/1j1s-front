import classNames from 'classnames';
import Image from 'next/legacy/image';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Hero/HeroComponent.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroComponentProps extends CommonProps {
  titlePrimaryText: React.ReactNode
  titleSecondaryText: React.ReactNode
  imgSrc: string
  additionalInformation?: React.ReactNode
}

export function HeroComponent({ titlePrimaryText, titleSecondaryText, imgSrc, className, children }: React.PropsWithChildren<HeroComponentProps>) {
  const { isLargeScreen } = useBreakpoint();

  return (
    <div className={classNames(styles.heading, className)}>
      <div className={styles.headingContainerWrapper}>
        <div className={styles.headingContainer}>
          <h1 className={styles.headingContainer__Title}>
            <span className={styles.headingContainer__TitlePrimary}>{titlePrimaryText}</span>
            <br />
            <span className={styles.headingContainer__TitleSecondary}>{titleSecondaryText}</span>
          </h1>
          {children}
        </div>
      </div>
      {isLargeScreen &&
        <div className={styles.imageWrapper}>
          <Image src={imgSrc} alt="" layout="fill" objectFit="cover" objectPosition="right"/>
        </div>
      }
    </div>
  );
}
