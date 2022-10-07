import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/ui/Hero/Hero.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroWithButtonLinkProps {
  titlePrimaryText: React.ReactNode
  titleSecondaryText?: React.ReactNode
  content: React.ReactNode
  buttonLabel: string
  buttonHref: string
  imgSrc: string
  additionalInformation?: React.ReactNode
}

export function HeroWithButtonLink(props: HeroWithButtonLinkProps) {
  const { titlePrimaryText, titleSecondaryText, content, buttonLabel, buttonHref, imgSrc, additionalInformation } = props;

  const { isLargeScreen } = useBreakpoint();

  return (
    <div className={styles.heading}>
      <div className={styles.headingContainerWrapper}>
        <div className={styles.headingContainer}>
          <h1 className={styles.headingContainer__Title}>
            <span className={styles.headingContainer__TitlePrimary}>{titlePrimaryText}</span>
            {titleSecondaryText && <span className={styles.headingContainer__TitleSecondary}>{titleSecondaryText}</span>}
          </h1>
          <p className={styles.headingContainer__TextContent}>
            {content}
          </p>
          <Link className={styles.linkAsButton} href={buttonHref} appearance='asPrimaryButton'>{buttonLabel}</Link>
          {additionalInformation}
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
