import { marked } from 'marked';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { dureeCategorisee } from '~/client/components/features/OffreDeStage/Consulter/getDureeCategorisee';
import {
  Domaines,
  OffreDeStageDétail,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';

interface ConsulterOffreDeStageProps {
    offreDeStage: OffreDeStageDétail
}

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {

  const listeEtiquettes: Array<string> = offreDeStage.domaines
    ? offreDeStage.domaines
      .filter((domaine) => domaine.nom !== Domaines.NON_RENSEIGNE)
      .map((domaine)=>domaine.nom)
    : [];
  listeEtiquettes.push(
    offreDeStage.localisation?.ville || offreDeStage.localisation?.departement || offreDeStage.localisation?.region as string,
    dureeCategorisee(offreDeStage.dureeEnJour || 0),
    'Débute le : ' + new Date(offreDeStage.dateDeDebut).toLocaleDateString(),
  );

  const salaireOffreDeStage = offreDeStage.remunerationBase?.toString();
  return (
    <ConsulterOffreLayout>
      <header className={commonStyles.titre}>
        <h1>{offreDeStage.titre}</h1>
        { offreDeStage.employeur?.nom && <h2>{offreDeStage.employeur?.nom}</h2>}
        <TagList list={listeEtiquettes} aria-label="Caractéristiques de l'offre de stage"/>
        <div className={commonStyles.buttonAsLinkWrapper}>
          <div className={commonStyles.buttonAsLink}>
            {offreDeStage.urlDeCandidature && <Link href={offreDeStage.urlDeCandidature} appearance="asPrimaryButton">Postuler</Link>}
          </div>
        </div>
      </header>
      <section className={commonStyles.contenu}>
        {offreDeStage.description &&
                <div>
                  <h3>Description du poste :</h3>
                  <p dangerouslySetInnerHTML={{ __html: marked.parse(offreDeStage.description) }}/>
                </div>
        }
        {offreDeStage.remunerationBase &&
                <div>
                  <h3>Salaire :</h3> {' '}
                  <p> {salaireOffreDeStage} €</p>
                </div>
        }
      </section>
    </ConsulterOffreLayout>
  );
}
