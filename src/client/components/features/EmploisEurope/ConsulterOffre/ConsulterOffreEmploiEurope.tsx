import React from 'react';

import { getTagsFromAnnonce } from '~/client/components/features/EmploisEurope/utils';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { EmploiEurope, LanguageSpecificationCompetence } from '~/server/emplois-europe/domain/emploiEurope';

import styles from './ConsulterOffreEmploiEurope.module.scss';

interface ConsulterOffreEmploiEuropeProps {
	annonceEmploiEurope: EmploiEurope
}

export function DetailEmploiEurope({ annonceEmploiEurope }: ConsulterOffreEmploiEuropeProps) {
	const descriptionSanitized = useSanitize(annonceEmploiEurope.description);
	const competencesLinguistiques = annonceEmploiEurope.competencesLinguistiques;

	function getDetailLanguageCompetence(detailCompetenceLanguistique: Array<LanguageSpecificationCompetence>) {
		return <ul>
			{detailCompetenceLanguistique?.map((specification, index) => {
				return <li key={`${specification.nomCompetence}-${index}`} className={styles.competenceLangageSpecification}>
					{specification.nomCompetence} ({specification.codeDuNiveauDeLaCompetence} - {specification.nomDuNiveauDeLaCompetence})
				</li>;
			})}
		</ul>;
	}

	function getCompetencesLinguistiquesRequises() {
		return competencesLinguistiques?.map((competence) => {
			return <div key={competence.langage} className={styles.competenceLangage}>
				<strong>{competence.langage}</strong> ({competence.codeDuNiveauDeLangue} - {competence.nomDuNiveauDeLangue})
				{getDetailLanguageCompetence(competence.detailCompetenceLanguistique)}
			</div>;
		});
	}

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{annonceEmploiEurope.titre || 'Offre d’emploi sans titre'}</h1>
				{annonceEmploiEurope.nomEntreprise && <p className={styles.sousTitre}>{annonceEmploiEurope.nomEntreprise}</p>}
				<TagList className={styles.tags} list={getTagsFromAnnonce(annonceEmploiEurope)} aria-label="Caractéristiques de l‘offre d‘emploi" />
			</header>
			{annonceEmploiEurope.urlCandidature &&
          <LinkStyledAsButtonWithIcon href={annonceEmploiEurope.urlCandidature} appearance="asPrimaryButton">
              Je postule sur Eures
          </LinkStyledAsButtonWithIcon>}
			<section className={styles.contenu}>
				<dl>
					{annonceEmploiEurope.description && <div className={styles.caracteristique}>
						<dt>Description du poste</dt>
						<dd dangerouslySetInnerHTML={{ __html: descriptionSanitized }}/>
					</div>}
					{annonceEmploiEurope.listePermis?.length > 0 && <div className={styles.caracteristique}>
						<dt>Type de permis requis</dt>
						<dd>{annonceEmploiEurope.listePermis.join(', ')}</dd>
					</div>}
					{annonceEmploiEurope.langueDeTravail.length > 0 && <div className={styles.caracteristique}>
						<dt>Langue de travail</dt>
						<dd className={styles.langueDeTravailDescription}>{annonceEmploiEurope.langueDeTravail.join(', ')}</dd>
					</div>}
					{competencesLinguistiques?.length > 0 && <div className={styles.caracteristique}>
						<dt>Compétences linguistiques requises</dt>
						<dd>{getCompetencesLinguistiquesRequises()}</dd>
					</div>}
				</dl>
			</section>
		</ConsulterOffreLayout>
	);
}
