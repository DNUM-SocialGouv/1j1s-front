import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/QuEstCeQueLeMentorat/QuEstCeQueLeMentorat.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

export function QuEstCeQueLeMentorat() {
	return (
		<section className={styles.quEstCeQueLeMentorat}>
			<Container className={styles.container}>
				<h2 className={styles.question}>
					Qu‘est-ce que le mentorat ?
				</h2>
				<div>
					Le mentorat, c’est l’accompagnement individuel bénévole d’un jeune par un mentor, qui peut aussi bien être lycéen qu’étudiant, actif ou retraité. Le « binôme » que forment le mentor et le jeune se rencontre plusieurs fois par mois (pendant au moins 6 mois) pour répondre aux objectifs du mentoré selon son âge et ses besoins. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.
				</div>
			</Container>
		</section>
	);
}
