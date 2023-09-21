import Image from 'next/image';

import useBreakpoint from '../../../../hooks/useBreakpoint';
import { Container } from '../../../layouts/Container/Container';
import { LinkStyledAsButton } from '../../../ui/LinkStyledAsButton/LinkStyledAsButton';
import styles from '../EmploiEnEuropeContent.module.scss';

interface LienEmploiEurope {
  url: string;
  title: string;
}

const linkList: Array<LienEmploiEurope> = [
	{
		title: 'Faire une partie de mon apprentissage en Europe',
		url: 'https://www.euroappmobility.eu/fr/',
	},
	{
		title: 'Chercher un Volontariat International (V.I.E / V.I.A)',
		url: 'https://mon-vie-via.businessfrance.fr/',
	},
	{
		title: 'S‘engager dans une mission de solidarité en Europe',
		url: 'https://europa.eu/youth/solidarity/young-people/volunteering_fr',
	},
];

export function LiensUtiles() {
	return (
		<section className={styles.liensUtiles}>
			<h2>Découvrez d’autres services destinés à vous aider à trouver l’expérience en Europe faite pour vous :</h2>
			<ul aria-label="liens utiles">
				{/* FIXME (GAFI 18-09-2023): WTF, no!  */}
				{linkList.map((link: LienEmploiEurope) => (
					<li key={link.title}>
						<LinkStyledAsButton appearance={'asQuaternayButton'} href={link.url}>
							{link.title}
						</LinkStyledAsButton>
					</li>
				))}
			</ul>
		</section>
	);
}
