import Image from 'next/image';

import styles from '~/client/components/features/JeDonneMonAvis/JeDonneMonAvis.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

export default function JeDonneMonAvis() {
	return <Container className={styles.jeDonneMonAvis}>
		<p className={styles.text}>Aidez-nous à améliorer la recherche de stage ! Donnez-nous votre avis sur cette démarche, cela ne prend que 2 minutes</p>
		<Link className={styles.lien} href="https://jedonnemonavis.numerique.gouv.fr/Demarches/3639?&view-mode=formulaire-avis&nd_source=button&key=8ff5d31556dab600903ec418c6079a86" title="Je donne mon avis - nouvelle fenêtre">
			<Image className={styles.image} src="https://jedonnemonavis.numerique.gouv.fr/static/bouton-bleu.svg" alt="Je donne mon avis" width={200} height={85} />
		</Link>
	</Container>;
}
