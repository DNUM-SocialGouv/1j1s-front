import Image from 'next/image';

import styles from '~/client/components/features/JeRecruteAfprPoei/Avantages/Avantages.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';

export default function Avantages() {
	return (
		<section className={styles.avantages}>
			<Container className={styles.container}>
				<Image
					src="/illustrations/mentorat-employeur.svg"
					alt=""
					width={100}
					height={100}
					className={styles.image}
				/>
				<div className={styles.texte}>
					<h2 className={styles.titre}>Les avantages</h2>
					<h3 className={styles.sousTitre}>Faites monter en compétences votre candidat</h3>
					<ul className={styles.listeAvantages}>
						<li><Icon name="arrow-right"/><p>Formez votre candidat selon vos besoins</p></li>
						<li><Icon name="arrow-right"/><p>Jusqu’à 400 heures de formation prises en charge par Pôle Emploi</p></li>
						<li><Icon name="arrow-right"/><p>Faites votre demande en ligne et gérez vos demandes en cours</p></li>
						<li><Icon name="arrow-right"/><p>Votre conseiller peut vous accompagner tout au long du montage de la demande d’aide</p></li>
						<li><Icon name="arrow-right"/><p>Plus de 80% des entreprises sont satisfaites et recommandent ce dispositif</p></li>
					</ul>
				</div>
			</Container>
		</section>
	);
}
