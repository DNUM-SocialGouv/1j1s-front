import classNames from 'classnames';

import { Image } from '~/client/components/props';
import styles from '~/client/components/ui/Carousel/Indicators.module.scss';

interface IndicatorsProps {
	goToSelectedSlide: (index: number) => void
	imageList: Array<Image>
	numberOfImages: number
	currentSlideIndex: number
}

export const Indicators = (props: IndicatorsProps) => {
	const { goToSelectedSlide, imageList, numberOfImages, currentSlideIndex } = props;

	return (
		<ul aria-label="indicateurs" className={styles.indicators}>
			{imageList.map((image, index) => (
				<li key={index} aria-current={index === currentSlideIndex}>
					<button
						type="button"
						title={`Afficher l‘image ${index + 1} sur ${numberOfImages}`}
						onClick={() => goToSelectedSlide(index)}
						className={classNames(styles.indicator, { [styles.indicatorActive]: index === currentSlideIndex })}>
						{index === currentSlideIndex && <span className="sr-only">(current slide)</span>}
						<span className="sr-only">{image.alt}</span>
					</button>
				</li>
			))}
		</ul>
	);
};
