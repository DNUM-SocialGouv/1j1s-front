import classNames from 'classnames';
import Image from 'next/legacy/image';
import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/FlippingCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import Marked from '~/client/components/ui/Marked/Marked';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface CardProps {
  imageUrl: string
  link: string
  title: string
  titleAs?: HtmlHeadingTag
  flippingCardContent: string
}

export const FlippingCard = ({ children, imageUrl, link, title, titleAs, flippingCardContent, ...rest }: React.PropsWithChildren<CardProps>) => {
	const cardFlipRef = useRef<HTMLDivElement>(null);
	const isInternalLink = useIsInternalLink(link);
	const [isCardFlipped, setIsCardFlipped] = useState(false);
	const [isAnimationOn, setIsAnimationOn] = useState(false);
	const hasFlipCardContent = !!flippingCardContent.length;


	useEffect(function setFocusOnFlip() {
		if (isCardFlipped) {
			const currentItem = cardFlipRef.current as HTMLDivElement;
			const firstElement = currentItem.getElementsByTagName('button')[0];
			firstElement.focus();
		}
	}, [isCardFlipped]);


	const linkAsButton = useMemo(function () {
		return <Link
			href={link}
			prefetch={false}
			className={styles.cardAction}
			appearance="asPrimaryButton"
		>
			<span>{isInternalLink ? 'Lire l‘article' : 'En savoir plus'}</span>

		</Link>;
	}, [isInternalLink, link]);

	const CardTitle = ({ children, className }: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) => {
		return React.createElement(titleAs || 'h3', { className: className }, children);
	};

	const flipCard = (reverse = false) => {
		setIsAnimationOn(!isAnimationOn);
		if(reverse) {
			setTimeout(() => {
				setIsCardFlipped(!isCardFlipped);
				const flipButton = document.getElementById('flipButton');
				if (flipButton) flipButton.focus();
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

				<div className={classNames(styles.cardActionWrapper, hasFlipCardContent ? styles.cardActionWrapperSpaceBetween : styles.cardActionWrapperFlexEnd)}>
					{hasFlipCardContent && <button id='flipButton' onClick={() => flipCard()}>Qui est concerné ?</button>}
					{linkAsButton}
				</div>
			</div>
			{ isCardFlipped && <div ref={cardFlipRef} className={classNames(styles.card, styles.cardFlipBack)}>
				<button onClick={() => flipCard(true)} className={styles.cardFlipBackAction}>
					<span className="sr-only">masquer la section qui est concerné</span>
					<Icon name='angle-left' aria-hidden="true"/>
				</button>
				<div className={styles.cardFlipBackTitle}>Qui est concerné ?</div>
				<div className={styles.cardFlipBackContent}><Marked markdown={flippingCardContent} /></div>
			</div>}
		</div>
	);
};

