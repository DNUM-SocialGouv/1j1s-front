import classNames from 'classnames';
import React, { useMemo } from 'react';

import { FoldingSection } from '~/client/components/features/FicheMetier/FoldingSection';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import styles from './consulter-fiche-metier.module.scss';

export function ConsulterFicheMetier({ ficheMetier }: { ficheMetier: FicheMétier }) {
  const {
    accesMetier,
    accrocheMetier,
    centresInteret,
    competences,
    conditionTravail,
    natureTravail,
    niveauAccesMin,
    nomMetier,
    secteursActivite,
    statuts,
    vieProfessionnelle,
  } = ficheMetier;

  const capitalizeFirstLetter = (sentence: string) => `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}` || '';

  const displayedNomMetier = useMemo(() => capitalizeFirstLetter(nomMetier), [nomMetier]);
  const displayedNiveauAccesMin = useMemo(() =>
    niveauAccesMin.map((niveau) => capitalizeFirstLetter(niveau.libelle)).join(', '), [niveauAccesMin]);
  const displayedStatuts = useMemo(() =>
    statuts.map((statut) => capitalizeFirstLetter(statut.libelle)).join(', '), [statuts]);
  const displayedCentresInteret = useMemo(() =>
    centresInteret.map((centre) => capitalizeFirstLetter(centre.libelle)), [centresInteret]);
	
  return (
    <>
      <section className={styles.section}>
			 <h1 className={styles.mainTitle}>{displayedNomMetier}</h1>
			 <div className={classNames(styles.sectionContent, styles.abstractSection)}>
				 <div className={styles.fieldDomaine}>
					 <span className={styles.fieldLabel}>Domaine(s) :</span>
					 <div className={styles.fieldContent}>
						 <TagList list={secteursActivite.map((fiche) => fiche.libelle)} />
					 </div>
				 </div>
				 <div className={styles.fieldRésumé}>
					 <span className={styles.fieldLabel}>Résumé :</span>
					 {accrocheMetier && <div className={styles.fieldContent} dangerouslySetInnerHTML={{ __html: accrocheMetier }} />}
				 </div>
				 <div className={styles.fieldNiveauAccès}>
					 <span className={styles.fieldLabel}>Niveau d&apos;accès minimum :</span>
					 {niveauAccesMin && <div className={styles.fieldContent}>{displayedNiveauAccesMin}</div>}
				 </div>
				 <div className={styles.fieldStatutsPro}>
					 <span className={styles.fieldLabel}>Statuts professionnels :</span>
					 {statuts && <div className={styles.fieldContent}>{displayedStatuts}</div>}
				 </div>
			 </div>
      </section>
      {natureTravail && <FoldingSection innerHtmlContent={natureTravail} title="Nature du travail" isOpen={true} />}
      {competences && <FoldingSection innerHtmlContent={competences} title="Compétences requises" />}
      {conditionTravail && <FoldingSection innerHtmlContent={conditionTravail} title="Lieu d'exercice et status" />}
      {vieProfessionnelle && <FoldingSection innerHtmlContent={vieProfessionnelle} title="Carrière et salaire" />}
      {accesMetier && <FoldingSection innerHtmlContent={accesMetier} title="Accès au métier" />}
      {centresInteret && centresInteret.length > 0 &&
			<section className={styles.section}>
			  <h2 className={styles.lastSectionTitle}>Centres d&apos;intérêt</h2>
			  <div className={styles.sectionContent}>
			    <TagList list={displayedCentresInteret} />
			  </div>
			</section>
      }
    </>
  );
}
