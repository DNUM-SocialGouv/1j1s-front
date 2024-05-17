import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './ModaleCommonFranceTravail.module.scss';

export function ModaleFranceTravail(props: { open: boolean, close: () => void, href: string }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
		className={styles.accompagnementModal}>
		<ModalComponent.Content className={styles.accompagnementModalContent}>
			<div>
				<h1>Vous pouvez bénéficier d’informations sur le Contrat d’Engagement Jeune auprès de votre conseiller
					France Travail</h1>
				<Link href={props.href} appearance="asPrimaryButton">
					Contacter mon conseiller
					<Link.Icon/>
				</Link>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
