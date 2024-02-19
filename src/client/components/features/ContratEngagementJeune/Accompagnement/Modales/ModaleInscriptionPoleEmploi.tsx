import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function ModaleInscriptionPoleEmploi(props: { open: boolean, close: () => void, href: string }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
		className={styles.accompagnementModal}>
		<ModalComponent.Content className={styles.accompagnementModalContent}>
			<div>
				<h1>Vous pouvez bénéficier des services de Pôle emploi</h1>
				<p>Inscrivez-vous à Pôle emploi pour bénéficier d‘un accompagnement répondant à vos besoins </p>
				<Link href={props.href} appearance="asPrimaryButton">
					S‘inscrire à Pôle emploi
					<Link.Icon/>
				</Link>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
