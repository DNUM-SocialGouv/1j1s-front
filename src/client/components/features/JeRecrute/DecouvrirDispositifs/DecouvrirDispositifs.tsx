import React from 'react';

import styles from '~/client/components/features/JeRecrute/DecouvrirDispositifs/DecouvrirDispositifs.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

export function DécouvrirDispositifs () {

	const body = 'Afin de recevoir des candidatures correspondant au besoin de la mission proposée, nous vous conseillons de bien détailler votre offre, en n’oubliant pas de préciser : <br><br>• Un titre pour votre offre de stage ; <br>• La description des missions (n’hésitez pas à faire une liste) ; <br>• Le lieu du stage (ville, code postal, département, région, pays) ; <br>• Votre secteur d’activité ; <br>• Les dates de début et de fin du stage, ainsi que la rémunération prévue ;<br>• Les coordonnées et le SIRET de votre entreprise ;<br>• Vos coordonnées ;<br>• L’URL ou le mail pour envoyer sa candidature. <br><br><br>Votre offre sera visible sur la plateforme après modération.';
	const subject = '[Déposer une offre de stage]';
	const mail = 'contact-1j1s@sg.social.gouv.fr';
	let MAIL_TO = `mailto:${mail}?subject=${subject}&body=${body.replaceAll('<br>', '%0D%0A').replaceAll('•', '%E2%80%A2')}`;

	if (process.env.NEXT_PUBLIC_DEPOT_STAGE_FEATURE === '1') {
		MAIL_TO = '/stages/deposer-offre';
	}

	return (
		<section>
			<Container className={styles.recruter}>
				<h1>Vous cherchez à recruter ?</h1>
				<p>Dans le cadre du plan 1 jeune, 1 solution, nous vous accompagnons dans la recherche de vos futurs collaborateurs.</p>
				<ul className={styles.offres}>
					<li>
						<LinkStyledAsButton href="/emplois/deposer-offre" appearance='asPrimaryButton' className={styles.offresLien}>Déposer une offre d‘emploi</LinkStyledAsButton>
					</li>
					<li>
						<LinkStyledAsButton href="/apprentissage/deposer-offre" appearance='asPrimaryButton' className={styles.offresLien}>Déposer une offre d’alternance</LinkStyledAsButton>
					</li>
					<li>
						<LinkStyledAsButton href={MAIL_TO} appearance='asPrimaryButton' className={styles.offresLien}>Déposer une offre de stage</LinkStyledAsButton>
					</li>
				</ul>
			</Container>
		</section>
	);
}
