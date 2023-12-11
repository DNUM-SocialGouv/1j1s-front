import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { getTagsFromAnnonce } from '~/client/components/features/EmploisEurope/utils';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

interface ConsulterOffreEmploiEuropeProps {
  annonceEmploiEurope: EmploiEurope
}

export function DetailEmploiEurope({ annonceEmploiEurope }: ConsulterOffreEmploiEuropeProps) {
	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{annonceEmploiEurope.titre || 'Offre d’emploi sans titre'}</h1>
				{annonceEmploiEurope.nomEntreprise && <p className={commonStyles.sousTitre}>{annonceEmploiEurope.nomEntreprise}</p>}
				<TagList list={getTagsFromAnnonce(annonceEmploiEurope)} aria-label="Caractéristiques de l‘offre d‘emploi" />
			</header>
			{annonceEmploiEurope.urlCandidature && <LinkStyledAsButtonWithIcon href={annonceEmploiEurope.urlCandidature} appearance="asPrimaryButton">
				Je postule sur Eures
			</LinkStyledAsButtonWithIcon>}
			<section className={commonStyles.contenu}>
			</section>
		</ConsulterOffreLayout>
	);
}
