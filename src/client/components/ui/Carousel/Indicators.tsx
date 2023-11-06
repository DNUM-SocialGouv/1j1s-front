import classNames from 'classnames';

import { Image } from '~/client/components/props';
import styles from '~/client/components/ui/Carousel/Indicators.module.scss';
import { defaultAlternative } from '~/client/components/ui/Carousel/Slide';

interface IndicatorsProps {
	goToSelectedSlide: (index: number) => void
	imageList: Array<Image>
	numberOfImages: number
	currentSlideIndex: number
}

export const Indicators = (props: IndicatorsProps) => {
	const { goToSelectedSlide, imageList, numberOfImages, currentSlideIndex } = props;

	return (
		<ul aria-label="Sélectionner l’image à afficher" role="group" className={styles.indicators}>
			{imageList.map((image, index) => (
				<li key={index}>
					<button
						type="button"
						onClick={() => goToSelectedSlide(index)}
						aria-disabled={index === currentSlideIndex ? true : undefined}
						className={classNames(styles.indicator, { [styles.indicatorActive]: index === currentSlideIndex })}>
						<span className="sr-only">{`Image ${defaultAlternative(index, numberOfImages)}`}</span>
					</button>
				</li>
			))}
		</ul>
	);
};
