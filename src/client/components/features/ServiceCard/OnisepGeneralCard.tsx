import React from 'react';

import { HtmlHeadingTag } from '../../props';
import { ServiceCard } from './Card/ServiceCard';

export interface OnisepGeneralCardProps {
	headingLevel?: HtmlHeadingTag
}

export function OnisepGeneralCard({ headingLevel }: OnisepGeneralCardProps) {
	return (
		<ServiceCard
			logo="/images/logos/onisep.svg"
			link="https://www.onisep.fr/"
			linkLabel="Aller sur onisep.fr"
			title={'Onisep : l’information pour l’orientation'}
			titleAs={headingLevel ?? 'h3'}
		>
            L’Onisep est un établissement public, sous tutelle du ministère de
            l’Education nationale, de la Jeunesse et des Sports, et du
            ministère de l’Enseignement supérieur, de la Recherche et de
            l’Innovation. Il a pour mission d’informer sur les secteurs
            professionnels, les métiers et les formations via ses productions
            numériques, imprimées, et ses services. Il accompagne les familles
            et les équipes éducatives en leur fournissant des ressources, des
            outils et dispositifs permettant de construire un parcours de
            formation et un projet professionnel tout au long de la vie.
		</ServiceCard>
	);
}
