import React from 'react';

import styles
	from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatFranceTravail/RecrutementCandidatFranceTravail.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Footnote } from '~/client/components/ui/Footnote/Footnote';
import { Link } from '~/client/components/ui/Link/Link';

export default function RecrutementCandidatFranceTravail() {
	return (
		<section>
			<Container className={styles.recrutementCandidatFranceTravail}>
				<h1>
					Je m’engage à recruter des candidats formés avec l’aide de France Travail
					(POE, AFPR)
					<Footnote.Reference to={'abreviation-reference'} id={'abreviation'}/>
				</h1>
				<p>
					Formez un candidat à vos besoins. Bénéficiez d’une aide au financement de la formation, anticipez vos
					besoins en recrutement sur vos métiers en tension et améliorez l’intégration des jeunes en entreprise
				</p>
				<Footnote htmlFor={'abreviation'} id={'abreviation-reference'} className={styles.footnote}>POE : Préparation
					Opérationnelle à l’Emploi ; AFPR : Action de Formation Préalable au Recrutement
				</Footnote>
				<div className={styles.links}>
					<Link
						href="https://entreprise.pole-emploi.fr/accueil/description/afpr"
						appearance="asPrimaryButton">
						M‘engager à recruter
						<Link.Icon/>
					</Link>
					<Link
						href="https://entreprise.pole-emploi.fr/accueil/choixauthentification?goto=https://entreprise.pole-emploi.fr/accueil/description/afpr"
						appearance="asSecondaryButton">
						Compléter une demande
						<Link.Icon/>
					</Link>
				</div>
			</Container>
		</section>
	);
}
