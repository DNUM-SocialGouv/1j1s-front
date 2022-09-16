import { marked } from 'marked';
import React from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { OffreDeStageDétail } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';

interface ConsulterOffreDeStageProps {
    offreDeStage: OffreDeStageDétail
}

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
  const afficheNomEmployeur = (nomEmployeur?: string) => {
    if (nomEmployeur) {
      return <h2>{nomEmployeur}</h2>;
    }
    return <></>;
  };

  const duree = (dureeEnJour: number) => {
    if (dureeEnJour % 365 === 0) {
      return `${dureeEnJour / 365} ans`;
    }
    if (dureeEnJour % 30 === 0) {
      return `${dureeEnJour / 30} mois`;
    }
    if (dureeEnJour % 7 === 0) {
      return `${dureeEnJour / 7} semaines`;
    }
    return `${dureeEnJour} jours`;
  };

  const dureeCategorisee = (dureeEnJour: number) => {
    if (dureeEnJour === 0) {
      return 'Non renseigné';
    }
    if (dureeEnJour < 30 && dureeEnJour !== 0) {
      return '< 1 mois';
    }
    if (dureeEnJour === 30) {
      return '1 mois';
    }
    if (dureeEnJour === 60) {
      return '2 mois';
    }
    if (dureeEnJour === 90) {
      return '3 mois';
    }
    if (dureeEnJour === 120) {
      return '4 mois';
    }
    if (dureeEnJour === 150) {
      return '5 mois';
    }
    if (dureeEnJour === 180) {
      return '6 mois';
    }
    if (dureeEnJour > 180) {
      return '> 6 mois';
    }
    return duree(dureeEnJour);
  };

  const listeEtiquettes: Array<string> = offreDeStage.domaines?.filter((domaine) => domaine.nom != 'non renseigné').map((domaine)=>domaine.nom) || [];
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
        {afficheNomEmployeur(offreDeStage.employeur?.nom)}
        <TagList list={listeEtiquettes} aria-label="Caractéristiques de l'offre de stage"/>
      </header>
      <section className={commonStyles.contenu}>
        <div className={commonStyles.buttonAsLink}>
          <LinkAsButton
            href={offreDeStage.urlDeCandidature}
            target="_blank">
            Postuler
          </LinkAsButton>
        </div>
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
