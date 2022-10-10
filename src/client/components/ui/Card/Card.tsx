import classNames from 'classnames';
import Image from 'next/image';
import React, {
  useMemo,
  useState,
} from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/Card.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface CardProps {
  imageUrl: string
  link: string
  linkLabel?: string
  title: string
  titleLevel?: HtmlHeadingTag
  flipCardContent: React.ReactNode
}

export const Card = ({ children, imageUrl, link, linkLabel, title, titleLevel, flipCardContent, ...rest }: React.PropsWithChildren<CardProps>) => {
  const isInternalLink = useIsInternalLink(link);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(false);

  const icon = useMemo(function () {
    return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'} />;
  }, [isInternalLink]);

  const CardTitle = ({ children, className }: { titleLevel?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) => {
    return React.createElement(titleLevel || 'h3', { className: className }, children);
  };

  const flipCard = (reverse = false) => {
    setIsAnimationOn(!isAnimationOn);
    if(reverse) {
      setTimeout(() => {
        setIsCardFlipped(!isCardFlipped);
      }, 500);
    } else {
      setIsCardFlipped(!isCardFlipped);
    }
  };

  return (
    <div className={classNames(styles.cardWrapper, { [styles.animate]: isAnimationOn })} {...rest}>
      <div className={classNames(styles.card, styles.cardFlip)}>
        <div className={styles.cardImageWrapper}>
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" objectPosition="top"/>
        </div>

        <div className={styles.cardContent}>
          <CardTitle className={styles.cardContentTitle}>{title}</CardTitle>
          {children}
        </div>

        <div className={styles.cardActionWrapper}>
          <button onClick={() => flipCard()}>Qui est concerné ?</button>
          <Link
            href={link}
            prefetch={false}
            className={styles.cardAction}
          >
            <span>{linkLabel}</span>
            {icon}
          </Link>
        </div>
      </div>
      { isCardFlipped && <div className={classNames(styles.card, styles.cardFlipBack)}>
        <button onClick={() => flipCard(true)} className={styles.cardFlipBackAction}>
          <span className="sr-only">fermer section qui est concerné</span>
          <Icon name='angle-left' aria-hidden="true"/>
        </button>
        <div className={styles.cardFlipBackTitle}>Qui est concerné ?</div>
        {flipCardContent}
      </div>}
    </div>
  );
};
