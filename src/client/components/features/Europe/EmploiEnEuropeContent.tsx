import styles from './EmploiEnEuropeContent.module.scss';
import { AidesFinancieres, Dispositifs, ExperiencesEnEurope, LiensUtiles } from './Sections';

export function EmploiEnEuropeContent() {
	return (
		<main id="contenu" className={styles.emploiEnEurope}>
			<ExperiencesEnEurope />
			<LiensUtiles />
			<Dispositifs />
			<AidesFinancieres />
		</main>
	);
}
