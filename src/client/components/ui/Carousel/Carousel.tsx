import classNames from 'classnames';
import {
	useCallback,
	useState,
} from 'react';

import {
	CommonProps,
	Image,
} from '~/client/components/props';
import { Controls } from '~/client/components/ui/Carousel/Controls';
import { Indicators } from '~/client/components/ui/Carousel/Indicators';
import { LiveRegion } from '~/client/components/ui/Carousel/LiveRegion';
import { Slide } from '~/client/components/ui/Carousel/Slide';

import styles from './Carousel.module.scss';

interface CarouselProps extends CommonProps {
	imageList: Array<Image>
	imageListLabel: string
	hideIndicators?: boolean
	imageSizes: { width: number, height: number }
}

export type Direction = 'next' | 'previous' | null;

export const Carousel = (props: CarouselProps) => {
	const { imageList, imageListLabel, imageSizes, hideIndicators=false, className, ...rest } = props;
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
	},[currentSlideIndex, isFirstSlide, numberOfImages]);

	const goToNextSlide = useCallback(() => {
		setIsAnimated(true);
		setCurrentSlideIndex(isLastSlide ? 0 : currentSlideIndex + 1);
		setIsInTransition(true);
		setDirection('previous');
	},[currentSlideIndex, isLastSlide]);

	const goToSelectedSlide = useCallback((index: number) => {
		setIsAnimated(false);
		setCurrentSlideIndex(index);
	},[]);

	return (
		<div aria-roledescription="carousel" role="group" className={_classNames} {...rest}>
			<ul aria-label={imageListLabel}>
				{ imageList.map((image, index) => (
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
						imageSizes={imageSizes}
					/>
				))}
			</ul>

			<Controls
				goToPreviousSlide={goToPreviousSlide}
				goToNextSlide={goToNextSlide}
			/>

			{ !hideIndicators && <Indicators
				goToSelectedSlide={goToSelectedSlide}
				imageList={imageList}
				currentSlideIndex={currentSlideIndex}
				numberOfImages={numberOfImages}
			/>
			}


			<LiveRegion
				currentSlideIndex={currentSlideIndex}
				numberOfImages={numberOfImages}
			/>

		</div>
	);
};

