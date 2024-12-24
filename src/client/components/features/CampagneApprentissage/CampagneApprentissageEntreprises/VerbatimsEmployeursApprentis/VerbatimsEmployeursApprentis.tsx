import React from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/VerbatimsEmployeursApprentis/VerbatimsEmployeursApprentis.module.scss';

import { Container } from '../../../../layouts/Container/Container';
import { PresentationCard } from '../../../../ui/Card/Presentation/PresentationCard';
import SeeMoreItemList from '../../../../ui/SeeMore/SeeMoreItemList';

interface VerbatimsEmployeursApprentisProps {
	verbatimsListe: Array<{
		imageUrl: string
		nomApprenti: string
		verbatim: string
	}>
}
export function VerbatimsEmployeursApprentis({ verbatimsListe }: VerbatimsEmployeursApprentisProps) {
	return (
		<section aria-labelledby={'titre-section-verbatims'} className={styles.sectionVerbatims}>
			<Container>
				<hgroup>
					<h2 id={'titre-section-verbatims'}>Ils ont choisi de former des apprentis, pourquoi pas vous ?</h2>
					<p>Découvrez les témoignages de Fabrice, Gaël, Julien, et de leurs apprentis !</p>
				</hgroup>
				<SeeMoreItemList
					itemList={verbatimsListe.map((verbatim, index) => {
						return (
							<PresentationCard
								className={styles.temoignage}
								key={index}
								imageSrc={verbatim.imageUrl}
								titleLabel={verbatim.nomApprenti}
								titleHeadingTag="h3"
								imageFit="cover">
								{verbatim.verbatim}
							</PresentationCard>
						);
					})}
					numberOfVisibleItems={3}
					seeMoreAriaLabel={'Voir plus de témoignages'}
					seeLessAriaLabel={'Voir moins de témoignages'} />
			</Container>
		</section>
	);
}

