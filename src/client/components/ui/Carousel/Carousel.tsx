import classNames from 'classnames';
import Image from 'next/image';
import React, {
	useCallback,
	useState,
} from 'react';

import { Image as ImageProps } from '~/client/components/props';
import { Controls } from '~/client/components/ui/Carousel/Controls';
import { Indicators } from '~/client/components/ui/Carousel/Indicators';
import { Slide } from '~/client/components/ui/Carousel/Slide';

import styles from './Carousel.module.scss';

interface CarouselProps extends React.ComponentPropsWithoutRef<'div'> {
	imageList: Array<ImageProps>
	hideIndicators?: boolean
	imagesSize: { width: number, height: number }
	onErrorImageLoading?: () => void
}

export type Direction = 'next' | 'previous' | null;

export function Carousel(props: CarouselProps) {
	const { imageList, imagesSize, hideIndicators = false, className, onErrorImageLoading, ...rest } = props;
	const _classNames = classNames(className, styles.carousel);
	const numberOfImages = imageList.length;

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [isInTransition, setIsInTransition] = useState(false);
	const [direction, setDirection] = useState<Direction>(null);
	const [isAnimated, setIsAnimated] = useState(true);
	const isLastSlide = (currentSlideIndex + 1) === numberOfImages;
	const isFirstSlide = currentSlideIndex === 0;

	const goToPreviousSlide = useCallback(() => {
		setIsAnimated(true);
		setCurrentSlideIndex(isFirstSlide ? numberOfImages - 1 : currentSlideIndex - 1);
		setIsInTransition(true);
		setDirection('next');
	}, [currentSlideIndex, isFirstSlide, numberOfImages]);

	const goToNextSlide = useCallback(() => {
		setIsAnimated(true);
		setCurrentSlideIndex(isLastSlide ? 0 : currentSlideIndex + 1);
		setIsInTransition(true);
		setDirection('previous');
	}, [currentSlideIndex, isLastSlide]);

	const goToSelectedSlide = useCallback((index: number) => {
		setIsAnimated(false);
		setCurrentSlideIndex(index);
	}, []);


	if (numberOfImages === 0) return null;

	if (numberOfImages === 1) {
		return (
			<Image
				src={imageList[0].src}
				onError={onErrorImageLoading}
				alt={imageList[0].alt || '1 sur 1'}
				width={imagesSize.width}
				height={imagesSize.height}
			/>
		);
	}

	return (
		<div aria-roledescription="carousel" role="group" className={_classNames} {...rest}>
			<ul aria-live="polite" aria-atomic={false}>
				{imageList.map((image, index) => (
					<Slide
						key={index}
						index={index}
						currentSlideIndex={currentSlideIndex}
						isFirstSlide={isFirstSlide}
						isLastSlide={isLastSlide}
						numberOfImages={numberOfImages}
						image={image}
						isInTransition={isInTransition}
						setIsInTransition={setIsInTransition}
						direction={direction}
						setDirection={setDirection}
						isAnimated={isAnimated}
						imagesSize={imagesSize}
						onErrorImageLoading={onErrorImageLoading}
					/>
				))}
			</ul>

			<Controls
				goToPreviousSlide={goToPreviousSlide}
				goToNextSlide={goToNextSlide}
			/>

			{!hideIndicators && (
				<Indicators
					goToSelectedSlide={goToSelectedSlide}
					imageList={imageList}
					currentSlideIndex={currentSlideIndex}
					numberOfImages={numberOfImages}
				/>
			)}
		</div>
	);
}

