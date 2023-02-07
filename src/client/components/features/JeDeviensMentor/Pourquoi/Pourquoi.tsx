import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/Pourquoi/Pourquoi.module.scss';
import SeeMoreMobileOnly from '~/client/components/ui/SeeMore/MobileOnly/SeeMoreMobileOnly';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Pourquoi() {
	const { isLargeScreen } = useBreakpoint();

	return (
		<div className={styles.pourquoi}>
			<article>
				<section>
					{isLargeScreen &&
            <Image
            	src="/illustrations/mentorat-employeur.svg"
            	alt=""
            	width={500}
            	height={300}
            />
					}
					<h2>Pourquoi participer à l’aventure du mentorat en tant qu’employeur ?</h2>
					<SeeMoreMobileOnly seeLessAriaLabel={'Voir plus de raisons de devenir mentor en tant qu‘employeur'} seeMoreAriaLabel={'Voir moins de raisons de devenir mentor en tant qu‘employeur'}>
						<ListeEmployeur/>
					</SeeMoreMobileOnly>
				</section>
				<section>
					{isLargeScreen &&
            <Image
            	src="/illustrations/mentorat-citoyen.svg"
            	alt=""
            	width={500}
            	height={300}
            />
					}
					<h2>Vous êtes citoyen : vous pouvez devenir mentor !</h2>
					<SeeMoreMobileOnly seeLessAriaLabel={'Voir plus de raisons de devenir mentor en tant que citoyen'} seeMoreAriaLabel={'Voir moins de raisons de devenir mentor en tant que citoyen'}>
						<ListeCitoyen/>
					</SeeMoreMobileOnly>
				</section>
			</article>
		</div>
	);
}

function ListeEmployeur() {
	return (
		<ul
			aria-label="Liste pourquoi participer à l’aventure du mentorat en tant qu’employeur"
			className={styles.listeEmployeur}
		>
			<li>
				Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure
				spécialisée dans le mentorat
			</li>
			<li>
				Pour contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex :
				bienveillance, écoute, conseil) et à leur épanouissement personnel
			</li>
			<li>Pour permettre la mise en valeur de votre entreprise et de vos métiers</li>
		</ul>
	);
}

function ListeCitoyen() {
	return (
		<ul aria-label="Liste pourquoi vous pouvez devenir mentor" className={styles.listeCitoyen}>
			<li>
				Pour partager votre expérience. Vous contribuerez à la réussite de jeunes et les ferez bénéficier de votre
				propre expérience
			</li>
			<li>
				Pour favoriser l’égalité des chances. Vous continuerez à servir la société et demeurrez actif au sein d’un
				réseau dynamique, même à la retraite
			</li>
			<li>Pour continuer à apprendre. Vous développerez votre réseau et vos compétences</li>
		</ul>
	);
}
