import React from 'react';

import styles from '~/client/components/features/Formation/Consulter/Statistiques/StatistiquesFormation.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	ArticleCard,
	ArticleCardList,
} from '~/client/components/ui/Card/Article/ArticleCard';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import { Statistique } from '~/server/formations/domain/statistique';

export function StatistiquesFormation({ statistiques }: { statistiques?: Statistique }) {
	if (!statistiques) return null;
	return (
		<div className={styles.section}>
			<EnTete
				heading="Et après la formation ?"
				headingLevel={'h2'}
				className={styles.entête}
				description={`Découvrez les chiffres-clés liés à cette formation pour la région ${statistiques.region}`}
			/>
			<Container>
				<article className={styles.layout}>
					<h3 className={styles.texteQuestion}>Que deviennent les apprenants après cette formation ?</h3>
					<ul>
						{ statistiques.tauxEnEmploi6Mois &&
            <li><span className={styles.textePourcentage}>{statistiques.tauxEnEmploi6Mois}%</span> sont en emploi au bout de 6 mois (quel que soit le type d’emploi et son secteur)</li>
						}
						{ statistiques.tauxEnFormation &&
            <li><span className={styles.textePourcentage}>{statistiques.tauxEnFormation}%</span> sont inscrits en formation (formation supérieure, redoublants, changement de filière)</li>
						}
						{ statistiques.tauxAutres6Mois &&
            <li><span className={styles.textePourcentage}>{statistiques.tauxAutres6Mois}%</span> sont dans d’autres cas (recherche d’emploi, service civique, à l’étranger, indépendant, etc)</li>
						}
					</ul>
					{ statistiques.millesime &&
						<p className={styles.millesime}>Données issues du dispositif InserJeunes, promotion {statistiques.millesime}</p>
					}
				</article>
				<ArticleCardList>
					<ArticleCard
						vertical={false}
						imageSrc="/images/logos/inserjeunes.svg"
						imageFit="contain"
						link="/articles/inserjeunes"
						titleLabel="InserJeunes, le dispositif qui vous présente le devenir des étudiants après un diplôme"
					>
						<p>
							Découvrez ce que sont devenus les étudiants toujours inscrits en formation ou ceux en emploi dans les 6 mois suivants la sortie de formation !
						</p>
					</ArticleCard>
				</ArticleCardList>
			</Container>
		</div>
	);
}
