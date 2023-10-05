import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from '../EmploiEnEuropeContent.module.scss';

export function LiensUtiles() {
	return (
		<section className={styles.liensUtiles}>
			<h2>Découvrez d’autres services destinés à vous aider à trouver l’expérience en Europe faite pour vous :</h2>
			<ul aria-label="liens utiles">
				<li>
					<LinkStyledAsButton appearance={'asQuaternayButton'} href="https://www.euroappmobility.eu/fr/">
						Vous souhaitez faire une partie de votre apprentissage en Europe
					</LinkStyledAsButton>
				</li>
				<li>
					<LinkStyledAsButton appearance={'asQuaternayButton'} href="https://mon-vie-via.businessfrance.fr/">
						Vous cherchez un Volontariat International (V.I.E / V.I.A)
					</LinkStyledAsButton>
				</li>
				<li>
					<LinkStyledAsButton appearance={'asQuaternayButton'} href="https://europa.eu/youth/solidarity/young-people/volunteering_fr">
						Vous souhaitez vous engager dans une mission de solidarité en Europe
					</LinkStyledAsButton>
				</li>
			</ul>
		</section>
	);
}
