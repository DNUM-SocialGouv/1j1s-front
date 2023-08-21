import React from 'react';

import styles
	from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatPoleEmploi/RecrutementCandidatPoleEmploi.module.scss';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export default function RecrutementCandidatPoleEmploi() {
	return (
		<section>
			<div className={styles.recrutementCandidatPoleEmploi}>
				<h1>
					Je m’engage à recruter des candidats formés avec l’aide de Pôle emploi
					(<abbr title="Préparation Opérationnelle à l’Emploi">POE</abbr>,
					<abbr title="Action de Formation Préalable au Recrutement">AFPR</abbr>)
					<abbr title="note de pied de page">*</abbr>
				</h1>
				<p>
					Formez un candidat à vos besoins. Bénéficiez d’une aide au financement de la formation, anticipez vos
					besoins en recrutement sur vos métiers en tension et améliorez l’intégration des jeunes en entreprise
				</p>
				<div className={styles.footnote}>
					<abbr title="note de pied de page">*</abbr> POE : Préparation Opérationnelle à l’Emploi ; AFPR : Action de
					Formation Préalable au Recrutement
				</div>
				<div className={styles.links}>
					<LinkStyledAsButton
						href="https://entreprise.pole-emploi.fr/accueil/description/afpr"
						appearance="asPrimaryButton">
						M‘engager à recruter
					</LinkStyledAsButton>
					<LinkStyledAsButton
						href="https://entreprise.pole-emploi.fr/accueil/choixauthentification?goto=https://entreprise.pole-emploi.fr/accueil/description/afpr"
						appearance="asSecondaryButton">
						Compléter une demande
					</LinkStyledAsButton>
				</div>
			</div>
		</section>
	);
}
