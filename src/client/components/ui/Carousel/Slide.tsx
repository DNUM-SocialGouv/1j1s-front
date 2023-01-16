import classNames from 'classnames';
import Image from 'next/image';
import { useMemo } from 'react';

import { Image as ImageProps } from '~/client/components/props';
import { Direction } from '~/client/components/ui/Carousel/Carousel';
import styles from '~/client/components/ui/Carousel/Slide.module.scss';


interface SlideProps {
	index: number
	currentSlideIndex: number
	isLastSlide: boolean
	isFirstSlide: boolean
	numberOfImages: number
	image: ImageProps
	isInTransition: boolean
	setIsInTransition: (isInTransition: boolean) => void
	direction: string | null
	setDirection: (direction: Direction) => void
	isAnimated: boolean
}

export const Slide = (props: SlideProps) => {
	const {
		index,
		currentSlideIndex,
		isLastSlide,
		isFirstSlide,
		numberOfImages,
		image,
		isInTransition,
		setIsInTransition,
		direction,
		setDirection,
		isAnimated,
	} = props;

	const isCurrentSlide = useMemo(() => index === currentSlideIndex, [index, currentSlideIndex]);
	const isNextSlide = useMemo(() => (isLastSlide && index === 0 || index === (currentSlideIndex + 1)), [isLastSlide, index, currentSlideIndex]);
	const isPreviousSlide = useMemo(() => (isFirstSlide && (index + 1 === numberOfImages) || index === (currentSlideIndex - 1)), [isFirstSlide, index, numberOfImages, currentSlideIndex]);

	return (
		<li
			key={index}
			aria-current={isCurrentSlide}
			aria-hidden={!isCurrentSlide}
			aria-roledescription="slide"
			onTransitionEnd={() => {
				setIsInTransition(false);
				setDirection(null);
			}}
			className={classNames(
				styles.slide,
				{ [styles.next]: isNextSlide },
				{ [styles.prev]: isPreviousSlide },
				{ [styles.current]: isCurrentSlide },
				{ [styles.nextInTransition]: isNextSlide && direction === 'next' && isInTransition },
				{ [styles.prevInTransition]: isPreviousSlide && direction === 'previous' && isInTransition },
				{ [styles.transition]: isAnimated },
			)}
		>
			<Image src={image.src} alt={image.alt} fill sizes="180px"/>
		</li>
	);
};
