import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { FoldingSection } from '~/client/components/ui/FoldingSection/FoldingSection';

import styles from './MonEspaceEnSavoirPlus.module.scss';

export function MonEspaceEnSavoirPlus() {
	return (
		<Container className={styles.objectifsContainer}>
			<FoldingSection summary={'En savoir plus sur "Les entreprises s‘engagent"'} summaryAs="h2">
				<p>
					<strong>
						La communauté &quot;Les entreprises s’engagent&quot; a été lancée par le Président de la République en
						juillet 2018
						dans
						l’objectif de renforcer et de pérenniser le lien entre l’Etat et l’Entreprise en faveur de l’emploi de tous
						les publics.
					</strong>
				</p>

				<ul>
					<li>
						Fédérer, sur l’ensemble du territoire, les entreprises - ainsi que les grands réseaux d’entreprises et
						partenaires - qui oeuvrent pour une société plus durable et solidaire.
					</li>
					<li>
						Simplifier l’accès à l’information, aux dispositifs et aux aides.
					</li>
					<li>
						Créer des espaces de coopération entre l’Etat et les entreprises pour accompagner le passage à l’action en
						offrant les outils et les moyens permettant à chacun d’agir à son échelle.
					</li>
					<li>
						Valoriser les entreprises qui s’engagent, leurs bonnes pratiques et les actions innovantes qu’elles
						développent.
					</li>
				</ul>
			</FoldingSection>

			<FoldingSection summary={'En savoir plus sur "La bonne alternance"'} summaryAs="h2">
				<p>
					<strong>
						La plateforme &quot;La bonne alternance&quot; a été créée pour simplifier la mise en relation entre jeunes,
						entreprises et centres de formation dans l’objectif de faciliter les entrées en alternance.
					</strong>
				</p>

				<ul>
					<li>
						Simplifier le dépôt d’offres pour les recruteurs, et leur permettre de publier leurs offres rapidement.
					</li>
					<li>
						Aider les jeunes candidats à trouver des formations et des contrats en alternance.
					</li>
					<li>
						Faciliter les contacts entre candidats, centres de formation et entreprises.
					</li>
					<li>
						Soutenir les PME et TPE dans leurs démarches de recrutement en alternance.
					</li>
				</ul>
			</FoldingSection>
		</Container>
	);
}
