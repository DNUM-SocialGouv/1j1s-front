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
		title: 'Trouver un emploi en Europe',
		url: 'https://ec.europa.eu/eures/portal/jv-se/home',
	},
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
	const { isLargeScreen } = useBreakpoint();
  
	return (
		<div>
			<Container className={styles.sectionLiens}>
				{/* FIXME (GAFI 18-09-2023): Passer par du CSS, c'est plus simple ... */}
				{isLargeScreen && (
					<div className={styles.imageWrapper}>
						<Image src="/images/europe.webp" alt="" width={560} height={160}/>
					</div>
				)}
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
			</Container>
		</div>
	);
}
