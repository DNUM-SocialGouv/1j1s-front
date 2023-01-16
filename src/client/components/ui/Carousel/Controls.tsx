import classNames from 'classnames';

import styles from '~/client/components/ui/Carousel/Controls.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface ControlsProps {
	goToPreviousSlide: () => void
	goToNextSlide: () => void
}

export const Controls = (props: ControlsProps) => {
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
