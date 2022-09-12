import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/EmployeurLinkCard.module.scss';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { Link } from '~/client/components/ui/Link/Link';

import { ArrowRightIcon } from '../Icon/arrow-right.icon';

interface EmployeurLinkCardProps {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
  titleLevel?: HtmlHeadingTag
  isMobile?: boolean
}

export function EmployeurLinkCard({ children, imageUrl, isMobile=false, link, linkLabel, title, titleLevel }: React.PropsWithChildren<EmployeurLinkCardProps>)  {

  function LinkCardTitle({ children, className }: { titleLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
    return React.createElement(titleLevel || 'h3', { className: className }, children);
  }

  return (
    <Link href={link} className={classNames(styles.card, { [styles.mobile]: isMobile })}>
      <article>
        <div className={styles.image}>
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
        </div>
        <LinkCardTitle className={styles.title}>{title}</LinkCardTitle>
        <div className={styles.description}>{children}</div>
        <span className={styles.link}>
          {linkLabel}
          { isMobile
            ? <ArrowRightIcon />
            : <AngleRightIcon />
          }
        </span>
      </article>
    </Link>
  );
};


