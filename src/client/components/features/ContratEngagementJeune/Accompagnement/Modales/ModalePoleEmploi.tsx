import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export function ModalePoleEmploi(props: { open: boolean, close: () => void, href: string }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
		className={styles.accompagnementModal}>
		<ModalComponent.Content className={styles.accompagnementModalContent}>
			<div>
				<h1>Vous pouvez bénéficier d’informations sur le Contrat d’Engagement Jeune auprès de votre conseiller
					Pôle emploi</h1>
				<LinkStyledAsButtonWithIcon href={props.href} appearance="asPrimaryButton">
					Contacter mon conseiller
				</LinkStyledAsButtonWithIcon>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
