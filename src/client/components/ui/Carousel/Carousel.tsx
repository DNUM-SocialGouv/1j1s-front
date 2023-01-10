import classNames from 'classnames';
import Image from 'next/image';
import {
	useCallback,
	useMemo,
	useState,
} from 'react';

import { CommonProps } from '~/client/components/props';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Carousel.module.scss';

interface Image {
	src: string
	alt: string
}

interface CarouselProps extends CommonProps {
	imageList: Array<Image>
	imageListLabel: string
}

export const Carousel = (props: CarouselProps) => {
	const { imageList, imageListLabel, className, ...rest } = props;
	const _classNames = classNames(className, styles.carousel);
	const numberOfImages = imageList.length;

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [isInTransition, setIsInTransition] = useState(false);
	const [direction, setDirection] = useState<null | 'previous' | 'next'>(null);
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
		<div aria-roledescription="carousel" className={_classNames} {...rest}>
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
					/>
				))}
			</ul>

			<Controls
				goToPreviousSlide={goToPreviousSlide}
				goToNextSlide={goToNextSlide}
			/>

			<Indicators
				goToSelectedSlide={goToSelectedSlide}
				imageList={imageList}
				currentSlideIndex={currentSlideIndex}
				numberOfImages={numberOfImages}
			/>

			<LiveRegion
				currentSlideIndex={currentSlideIndex}
				numberOfImages={numberOfImages}
			/>

		</div>
	);
};

interface SlideProps {
	index: number
	currentSlideIndex: number
	isLastSlide: boolean
	isFirstSlide: boolean
	numberOfImages: number
	image: Image
	isInTransition: boolean
	setIsInTransition: (isInTransition: boolean) => void
	direction: string | null
	setDirection: (direction: 'next' | 'previous' | null) => void
	isAnimated: boolean
}

const Slide = (props: SlideProps) => {
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
	const isNextSlide = useMemo(() => ((isLastSlide && index === 0) || (index === (currentSlideIndex + 1))), [isLastSlide, index, currentSlideIndex]);
	const isPreviousSlide = useMemo(() =>((isFirstSlide && (index + 1 === numberOfImages)) || (index === (currentSlideIndex - 1))), [isFirstSlide, index, numberOfImages, currentSlideIndex]);

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
			<Image src={image.src} alt={image.alt} fill sizes="180px" />
		</li>
	);
};

interface ControlsProps {
	goToPreviousSlide: () => void
	goToNextSlide: () => void
}

const Controls = (props: ControlsProps) => {
	const { goToPreviousSlide, goToNextSlide } = props;

	return (
		<ul aria-label="contrôles">
			<li>
				<button
					type="button"
					title="image précédente"
					onClick={() => goToPreviousSlide()}
					className={classNames(styles.controls, styles.controlsPrevious)}
				>
					<Icon name="angle-left"/>
				</button>
			</li>
			<li>
				<button
					type="button"
					title="image suivante"
					onClick={() => goToNextSlide()}
					className={classNames(styles.controls, styles.controlsNext)}
				>
					<Icon name="angle-right"/>
				</button>
			</li>
		</ul>
	);
};

interface  IndicatorsProps {
	goToSelectedSlide: (index: number) => void
	imageList: Array<Image>
	numberOfImages: number
	currentSlideIndex:number
}

const Indicators = (props: IndicatorsProps) => {
	const { goToSelectedSlide, imageList, numberOfImages, currentSlideIndex } = props;

	return (
		<ul aria-label="indicateurs" className={styles.indicators}>
			{ imageList.map((image, index) => (
				<li key={index}>
					<button
						type="button"
						title={`Afficher l‘image ${index + 1} sur ${numberOfImages}`}
						onClick={() => goToSelectedSlide(index)}
						className={classNames(styles.indicator, { [styles.indicatorActive]: index === currentSlideIndex })}>
						{ index === currentSlideIndex && <span className="sr-only">(current slide)</span>}
						<span className="sr-only">{image.alt}</span>
					</button>
				</li>
			))}
		</ul>
	);
};

const LiveRegion = (props: { currentSlideIndex: number, numberOfImages: number}) => {
	const { currentSlideIndex, numberOfImages } = props;

	return (
		<div aria-live="polite" aria-atomic={true} className="sr-only">
			Image {currentSlideIndex + 1} sur {numberOfImages}
		</div>
	);
};
