import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from '../EmploiEnEuropeContent.module.scss';

export function LiensUtiles() {
	return (
		<section className={styles.liensUtiles}>
			<h2>Découvrez d’autres services destinés à vous aider à trouver l’expérience en Europe faite pour vous :</h2>
			<ul aria-label="liens utiles">
				<li>
					<LinkStyledAsButtonWithIcon appearance='asQuaternaryButton' href="https://www.euroappmobility.eu/fr/">
						Vous souhaitez faire une partie de votre apprentissage en Europe
					</LinkStyledAsButtonWithIcon>
				</li>
				<li>
					<LinkStyledAsButtonWithIcon appearance='asQuaternaryButton' href="https://mon-vie-via.businessfrance.fr/">
						Vous cherchez un Volontariat International (<abbr title="Volontariat International en Entreprise">V.I.E</abbr> / <abbr title="Volontariat International en Administration">V.I.A</abbr>)
					</LinkStyledAsButtonWithIcon>
				</li>
				<li>
					<LinkStyledAsButtonWithIcon appearance='asQuaternaryButton' href="https://europa.eu/youth/solidarity/young-people/volunteering_fr">
						Vous souhaitez vous engager dans une mission de solidarité en Europe
					</LinkStyledAsButtonWithIcon>
				</li>
			</ul>
		</section>
	);
}
