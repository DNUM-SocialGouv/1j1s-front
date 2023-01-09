import classNames from 'classnames';
import Image from 'next/image';
import {
	useCallback,
	useState,
} from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Carousel.module.scss';

interface CarouselProps {
	imageUrlList: [string]
	titreDeLAnnonce?: string
}

export const Carousel = (props: CarouselProps) => {
	const { imageUrlList, titreDeLAnnonce } = props;
	const numberOfImages = imageUrlList.length;

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [isInTransition, setIsInTransition] = useState(false);
	const [direction, setDirection] = useState<null | 'previous' | 'next'>(null);

	const isLastSlide = (currentSlideIndex + 1) === numberOfImages;
	const isFirstSlide = currentSlideIndex === 0;

	const goToPreviousSlide = useCallback(() => {
		setCurrentSlideIndex(isFirstSlide ? numberOfImages - 1 : currentSlideIndex - 1);
		setIsInTransition(true);
		setDirection('next');
	},[currentSlideIndex, isFirstSlide, numberOfImages]);

	const goToNextSlide = useCallback(() => {
		setCurrentSlideIndex(isLastSlide ? 0 : currentSlideIndex + 1);
		setIsInTransition(true);
		setDirection('previous');
	},[currentSlideIndex, isLastSlide]);

	const goToSelectedSlide = (index: number) => {
		setCurrentSlideIndex(index);
	};

	return (
		<div aria-roledescription="carousel" className={styles.carousel}>
			<ul aria-label="liste des photos du logement">
				{ imageUrlList.map((src, index) => (
					<Slide
						key={index}
						index={index}
						currentSlideIndex={currentSlideIndex}
						isFirstSlide={isFirstSlide}
						isLastSlide={isLastSlide}
						numberOfImages={numberOfImages}
						src={src}
						alt={titreDeLAnnonce || ''}
						isInTransition={isInTransition}
						setIsInTransition={setIsInTransition}
						direction={direction}
						setDirection={setDirection}
					/>
				))}
			</ul>

			<Controls
				goToPreviousSlide={goToPreviousSlide}
				goToNextSlide={goToNextSlide}
				isInTransition={isInTransition}
			/>

			<Indicators
				goToSelectedSlide={goToSelectedSlide}
				imageUrlList={imageUrlList}
				numberOfImages={numberOfImages}
				titreDeLAnnonce={titreDeLAnnonce}
				currentSlideIndex={currentSlideIndex}
			/>

			<LiveRegion
				currentSlideIndex={currentSlideIndex}
				numberOfImages={numberOfImages}
			/>

		</div>
	);
};

const Slide = (props: {index: number, currentSlideIndex: number, isLastSlide: boolean, isFirstSlide: boolean, numberOfImages: number,  src: string, alt: string, isInTransition: boolean, setIsInTransition: (boolean) => void, direction: string, setDirection: (string) => void}) => {
	const { index, currentSlideIndex, isLastSlide, isFirstSlide, numberOfImages, src, alt, isInTransition, setIsInTransition, direction, setDirection } = props;

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
				{ [styles.next]: ( (isLastSlide && index === 0) || (index === (currentSlideIndex + 1)) ) },
				{ [styles.prev]: ( (isFirstSlide && (index + 1 === numberOfImages)) || (index === (currentSlideIndex - 1)) ) },
				{ [styles.current]: (index === currentSlideIndex) },
				{ [styles.nextInTransition]: ((isLastSlide && index === 0) || (index === (currentSlideIndex + 1))) && direction === 'next' && isInTransition },
				{ [styles.prevInTransition]: ((isFirstSlide && (index + 1 === numberOfImages)) || (index === (currentSlideIndex - 1))) && direction === 'previous' && isInTransition },
			)}
		>
			<Image src={src} alt={alt} fill />
		</li>
	);
};

const Controls = (props: { goToPreviousSlide: () => void, goToNextSlide: () => void, isInTransition:boolean }) => {
	const { goToPreviousSlide, goToNextSlide, isInTransition } = props;

	return (
		<ul aria-label="contrôles">
			<li>
				<button
					type="button"
					title="image précédente"
					onClick={() => goToPreviousSlide()}
					className={classNames(styles.controls, styles.controlsPrevious)}
					disabled={isInTransition}
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
					disabled={isInTransition}
				>
					<Icon name="angle-right"/>
				</button>
			</li>
		</ul>
	);
};

const Indicators = (props: { goToSelectedSlide: (index: number) => void, imageUrlList: [string], numberOfImages: number, titreDeLAnnonce: string, currentSlideIndex:number }) => {

	const { goToSelectedSlide, imageUrlList, numberOfImages, titreDeLAnnonce, currentSlideIndex } = props;
	return (
		<ul aria-label="indicateurs" className={styles.indicators}>
			{ imageUrlList.map((src, index) => (
				<li key={index}>
					<button
						type="button"
						title={`Afficher l‘image ${index + 1} sur ${numberOfImages}`}
						onClick={() => goToSelectedSlide(index)}
						className={classNames(styles.indicator, { [styles.indicatorActive]: index === currentSlideIndex })}>
						{ index === currentSlideIndex && <span className="sr-only">(current slide)</span>}
						<span className="sr-only">{titreDeLAnnonce}</span>
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
