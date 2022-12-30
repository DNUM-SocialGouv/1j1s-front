import Image, { StaticImageData } from 'next/legacy/image';
import portraitKévin from 'public/images/CEJ/vignette-kevin.jpg';
import portraitLatifa from 'public/images/CEJ/vignette-latifa.jpg';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Témoignages/Témoignages.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import useBreakpoint from '~/client/hooks/useBreakpoint';


const programmeKévin = `
#### Son programme :

+ 3 mois dans sa Mission Locale avec son conseiller qui lui proposera des ateliers collectifs pour
  travailler sur son projet professionnel et effectuer des stages en entreprise en bénéficiant d‘une
  allocation de 500 euros par mois.
+ Intéressé par le sport, il pourra ensuite faire un service civique de 8 mois dans une association
  qui propose des activités sportives à des jeunes en difficulté.
+ Pour finir, avant de se lancer sur le marché du travail, il retournera dans sa Mission Locale
  pendant 1 mois pour préparer des entretiens d‘embauche avec son conseiller et démarcher des entreprises.
+ **Objectif :** à la fin de son programme, Kévin aura trouvé un emploi dans un domaine dans lequel il s‘épanouit.
`;

const programmeLatifa = `
#### Son programme :

+ Un parcours de 9 mois construit avec son conseiller Pôle emploi, dont 6 mois d‘accompagnement intensif
  avec des séances individuelles, des ateliers collectifs et des immersions en entreprise pour découvrir des métiers.
+ Elle bénéficiera d‘une allocation de 500 euros par mois, car elle n‘a pas de ressources financières.
+ Après cette période et la découverte d‘un métier qui l‘intéresse, elle pourra se former encore pendant 3 mois
  en prépa apprentissage.
+ **Objectif :** elle pourra candidater à un contrat en apprentissage dans une entreprise.
`;

interface TémoignageData {
  prénom: string
  age: string
  bio: string
  programme: string
  portrait: StaticImageData
}
const témoignageLatifa: TémoignageData = {
	age: '22 ans',
	bio: 'Diplômée d‘un CAP gestion, sans emploi et sans aucune financière, elle pourra bénéficier du Contrat d‘Engagement Jeune.',
	portrait: portraitLatifa,
	programme: programmeLatifa,
	prénom: 'Latifa',
};

const témoignageKévin: TémoignageData = {
	age: '18 ans',
	bio: 'Sans diplôme et sans aucune ressource financière, il pourra bénéficier du Contrat d‘Engagement Jeune.',
	portrait: portraitKévin,
	programme: programmeKévin,
	prénom: 'Kévin',
};


interface TémoignageProps {
  id?: string
  témoignage: TémoignageData
}

export function TémoignageKévin ({ id }: { id: string }) {
	return (<Témoignage id={ id } témoignage={ témoignageKévin } />);
}
export function TémoignageLatifa ({ id }: { id: string }) {
	return (<Témoignage id={ id } témoignage={ témoignageLatifa } />);
}

function Témoignage({ id, témoignage }: TémoignageProps) {
	return (
		<section className={ styles.témoignage } id={ id } >
			<article>
				<h2>Ce que le Contrat d‘Engagement Jeune proposera à { témoignage.prénom }</h2>
				<div className={ styles.portrait }>
					<Image src={ témoignage.portrait } alt="" />
				</div>
				<div className={ styles.bio }>
					<h3>{ témoignage.prénom }, {témoignage.age }</h3>
					<p>{ témoignage.bio }</p>
				</div>
				<Programme programme={ témoignage.programme }/>
			</article>
		</section>
	);
}

function Programme ({ programme }: { programme: string }) {
	const { isSmallScreen, isMediumScreen } = useBreakpoint();
	const ContenuProgramme = (<Marked className={ styles.programme } markdown={ programme }/>);

	if (isSmallScreen || isMediumScreen) {
		return (<SeeMore overridedClosedLabel="Découvrez son programme et ce que le CEJ lui apporte" additionalButtonClassName={styles.buttonAccordeon}>{ ContenuProgramme }</SeeMore>);
	} else {
		return ContenuProgramme;
	}

}
