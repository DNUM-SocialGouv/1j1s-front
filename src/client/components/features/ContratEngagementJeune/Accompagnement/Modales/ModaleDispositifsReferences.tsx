import classNames from 'classnames';
import { useId } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './ModaleDispositifsReferences.module.scss';

export function ModaleDispositifsReferences(props: { open: boolean, close: () => void }) {
	const titleId = useId();
	return (
		<ModalComponent
			aria-labelledby={titleId}
			isOpen={props.open}
			close={props.close}
			className={styles.dispositifsModale}>
			<ModalComponent.Content className={styles.content}>
				<div>
					<h1 className={styles.title} id={titleId}>Découvrez les dispositifs référencés sur le portail
					1jeune1solution</h1>
					<ul>
						<li>
							<Link href={'/#offres'}>
								<Icon name="brief-case" className={classNames(styles.icon, styles.iconOffre)} />
								<p>Découvrez nos offres</p>
							</Link>
						</li>
						<li>
							<Link href={'/#formation'}>
								<Icon name={'book'} className={classNames(styles.icon, styles.iconFormation)} />
								<p>Formation et orientation</p>
							</Link>
						</li>
						<li>
							<Link href={'/#aides-orientation-accompagnement'}>
								<Icon name={'compass'} className={classNames(styles.icon, styles.iconAide)} />
								<p>Aides et accompagnement</p>
							</Link>
						</li>
						<li>
							<Link href={'/#engagement-benevolat'}>
								<Icon name="trophy" className={classNames(styles.icon, styles.iconBenevolat)} />
								<p>Engagement</p>
							</Link>
						</li>
					</ul>
				</div>
			</ModalComponent.Content>
		</ModalComponent>
	);
}
