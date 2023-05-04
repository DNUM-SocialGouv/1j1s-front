import classNames from 'classnames';
import Image from 'next/image';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import styles from '~/client/components/ui/Card/Flipping/FlippingCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import Marked from '~/client/components/ui/Marked/Marked';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

interface FlippingCardProps {
	imageUrl: string
	link: string
	title: string
	category?: string
	titleAs?: HtmlHeadingTag
	flippingCardContent: string
	className?: string
}

export function FlippingCard(props: FlippingCardProps) {
	const { category, imageUrl, link, title, titleAs, flippingCardContent, className, ...rest } = props;
	const cardFlipRef = useRef<HTMLDivElement>(null);
	const isInternalLink = useIsInternalLink(link);
	const [isCardFlipped, setIsCardFlipped] = useState(false);
	const [isAnimationOn, setIsAnimationOn] = useState(false);
	const hasFlipCardContent = !!flippingCardContent.length;
	const flipButton = useRef<HTMLButtonElement>(null);

	const categoryClass = useMemo(() => {
		switch (category) {
			case 'Accompagnement':
				return styles.cardCategoryAccompagnement;
			case 'Orientation et formation':
				return styles.cardCategoryOrienterFormer;
			case 'Entrée dans la vie professionnelle':
				return styles.cardCategoryVieProfessionnelle;
		}
	}, [category]);


	useEffect(function setFocusOnFlip() {
		if (isCardFlipped) {
			const currentItem = cardFlipRef.current as HTMLDivElement;
			const firstElement = currentItem.getElementsByTagName('button')[0];
			firstElement.focus();
		}
	}, [isCardFlipped]);


	const linkAsButton = useMemo(function () {
		return <LinkStyledAsButton
			href={link}
			prefetch={false}
			className={styles.cardAction}
			appearance="asPrimaryButton"
		>
			<span>{isInternalLink ? 'Lire l‘article' : 'En savoir plus'}</span>
		</LinkStyledAsButton>;
	}, [isInternalLink, link]);

	const flipCard = useCallback((reverse = false) => {
		setIsAnimationOn(!isAnimationOn);
		if (reverse) {
			setTimeout(() => {
				setIsCardFlipped(!isCardFlipped);
				if (flipButton.current) {
					flipButton.current.focus();
				}
			}, 500);
		} else {
			setIsCardFlipped(!isCardFlipped);
		}
	}, [isAnimationOn, flipButton, isCardFlipped]);

	return (
		<div className={classNames(styles.cardWrapper, { [styles.animate]: isAnimationOn }, className)} {...rest}>
			<div className={classNames(styles.card, styles.cardFlip)}>
				<Image src={imageUrl} alt="" width={360} height={180}/>
				{category && <div className={classNames(styles.cardCategory, categoryClass)}>{category}</div>}

				<div className={styles.cardBody}>
					<CardTitle className={styles.cardBodyTitle} titleAs={titleAs}>{title}</CardTitle>
					<div
						className={classNames(styles.cardActionWrapper, hasFlipCardContent ? styles.cardActionWrapperSpaceBetween : styles.cardActionWrapperFlexEnd)}>
						{hasFlipCardContent &&
                <ButtonComponent
                	label="Qui est concerné ?"
                	appearance={'quaternary'}
                	className={styles.cardActionWrapperButton}
                	ref={flipButton}
                	onClick={() => flipCard()}>
                </ButtonComponent>
						}
						{linkAsButton}
					</div>
				</div>
			</div>
			{isCardFlipped && (
				<div ref={cardFlipRef} className={classNames(styles.card, styles.cardFlipBack)}>
					<button onClick={() => flipCard(true)} className={styles.cardFlipBackAction}>
						<span className="sr-only">masquer la section qui est concerné</span>
						<Icon name="angle-left" aria-hidden="true"/>
					</button>
					<div className={styles.cardFlipBackTitle}>Qui est concerné ?</div>
					<div className={styles.cardFlipBackContent}><Marked markdown={flippingCardContent}/></div>
				</div>)
			}
		</div>
	);
}

function CardTitle(props: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
	const { children, className, titleAs } = props;
	return React.createElement(titleAs || 'h3', { className: className }, children);
}
