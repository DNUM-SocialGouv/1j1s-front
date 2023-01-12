import classNames from 'classnames';
import Image from 'next/image';
import { useMemo } from 'react';

import { Image as ImageProps } from '~/client/components/ui/Carousel/Carousel';
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
	setDirection: (direction: 'next' | 'previous' | null) => void
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

	const isIndexTheNextSlide = useMemo(() => (index === (currentSlideIndex + 1)), [index, currentSlideIndex]);
	const isIndexThePreviousSlide = useMemo(() => (index === (currentSlideIndex - 1)), [index, currentSlideIndex]);

	const isNextSlideFirstOfImageList = useMemo(() => (isLastSlide && index === 0), [isLastSlide, index]);
	const isPreviousSlideLastOfImageList = useMemo(() => (isFirstSlide && (index + 1 === numberOfImages)), [isFirstSlide, index, numberOfImages]);

	const isCurrentSlide = useMemo(() => index === currentSlideIndex, [index, currentSlideIndex]);
	const isNextSlide = useMemo(() => (isNextSlideFirstOfImageList || isIndexTheNextSlide), [isNextSlideFirstOfImageList, isIndexTheNextSlide]);
	const isPreviousSlide = useMemo(() => (isPreviousSlideLastOfImageList || isIndexThePreviousSlide), [isPreviousSlideLastOfImageList, isIndexThePreviousSlide]);

	return (
		<li
			key={index}
			aria-current={index === currentSlideIndex}
			aria-hidden={index !== currentSlideIndex}
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
