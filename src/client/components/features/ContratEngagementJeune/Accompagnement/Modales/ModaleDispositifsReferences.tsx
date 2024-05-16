import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './ModaleDispositifsReferences.module.scss';

export function ModaleDispositifsReferences(props: { open: boolean, close: () => void }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
		className={styles.dispoisitifsModale}>
		<ModalComponent.Content className={styles.content}>
			<div>
				<h1 className={styles.title}>Découvrez les dispositifs référencés sur le portail
					1jeune1solution</h1>
				<ul>
					<li>
						<Link href={'/#offres'}>
							<Icon name="brief-case" className={styles.iconOffre}/>
							<p>Découvrez nos offres</p>
						</Link>
					</li>
					<li>
						<Link href={'/#formation'}>
							<Icon name={'book'} className={styles.iconFormation}/>
							<p>Formation et orientation</p>
						</Link>
					</li>
					<li>
						<Link href={'/#aides-orientation-'}>
							<Icon name={'compass'} className={styles.iconAide}/>
							<p>Aides et </p>
						</Link>
					</li>
					<li>
						<Link href={'/#engagement-benevolat'}>
							<Icon name="trophy" className={styles.iconBenevolat}/>
							<p>Engagement</p>
						</Link>
					</li>
				</ul>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
