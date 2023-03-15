import styles from '~/client/components/features/Formation/Consulter/Statistiques/StatistiquesFormation.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Certification } from '~/server/formations/domain/certification';

export function StatistiquesFormation({ statistiques }: { statistiques: Certification }) {
	return (
		<div className={styles.section}>
			<Container>
				<article className={styles.layout}>
					<h3 className={styles.texteQuestion}>Que deviennent les apprenants après cette formation ?</h3>
					{ statistiques.tauxEnEmploi6Mois &&
						<p><span className={styles.textePourcentage}>{statistiques.tauxEnEmploi6Mois}%</span> sont en emploi au bout de 6 mois (quel que soit le type d’emploi et son secteur)</p>
					}
					{ statistiques.tauxEnFormation &&
						<p><span className={styles.textePourcentage}>{statistiques.tauxEnFormation}%</span> sont inscrits en formation (formation supérieure, redoublants, changement de filière)</p>
					}
					{ statistiques.tauxAutres6Mois &&
						<p><span className={styles.textePourcentage}>{statistiques.tauxAutres6Mois}%</span> sont dans d’autres cas (recherche d’emploi, service civique, à l’étranger, indépendant, etc)</p>
					}
					{ statistiques.millesime &&
						<p className={styles.millesime}>Données issues du dispositif InserJeunes, promotion {statistiques.millesime}</p>
					}
				</article>
			</Container>
		</div>
	);
}
