import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function ModaleDispositifsReferences(props: { open: boolean, close: () => void }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
		className={styles.accompagnementDispositifs}>
		<ModalComponent.Content className={styles.accompagnementDispositifs__Content}>
			<div>
				<h1 className={styles.accompagnementDispositifs__Title}>Découvrez les dispositifs référencés sur le portail
					1jeune1solution</h1>
				<ul className={styles.accompagnementDispositifsPosition}>
					<li>
						<LinkDeprecated href={'/#offres'} className={styles.accompagnementDispositifsPositionIcon}>
							<Icon name="brief-case" className={styles.accompagnementDispositifsPositionIconOffre}/>
							<p>Découvrez nos offres</p>
						</LinkDeprecated>
					</li>
					<li>
						<LinkDeprecated href={'/#formation'} className={styles.accompagnementDispositifsPositionIcon}>
							<Icon name={'book'} className={styles.accompagnementDispositifsPositionIconFormation}/>
							<p>Formation et orientation</p>
						</LinkDeprecated>
					</li>
					<li>
						<LinkDeprecated
							href={'/#aides-orientation-accompagnement'}
							className={styles.accompagnementDispositifsPositionIcon}>
							<Icon name={'compass'} className={styles.accompagnementDispositifsPositionIconAide}/>
							<p>Aides et accompagnement</p>
						</LinkDeprecated>
					</li>
					<li>
						<LinkDeprecated href={'/#engagement-benevolat'} className={styles.accompagnementDispositifsPositionIcon}>
							<Icon name="trophy" className={styles.accompagnementDispositifsPositionIconBenevolat}/>
							<p>Engagement</p>
						</LinkDeprecated>
					</li>
				</ul>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
