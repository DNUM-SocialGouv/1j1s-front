import classNames from 'classnames';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { dependencies } from '~/server/start';

import styles from './decouvrir-les-metiers.module.scss';

interface ConsulterFicheMetierPageProps {
	ficheMetier: FicheMétier
}

export default function ConsulterFicheMetierPage({ ficheMetier }: { ficheMetier: FicheMétier }) {
  if (!ficheMetier) return null;
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

  return (
    <>
      <HeadTag title={`${ficheMetier.nomMetier} | 1jeune1solution`} />
      <main id="contenu">
        <Container className={styles.container}>
          <section className={styles.section}>
            <h1 className={styles.mainTitle}>{capitalizeFirstLetter(nomMetier)}</h1>
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
                {niveauAccesMin && <div className={styles.fieldContent}>{niveauAccesMin.map((niveau) => capitalizeFirstLetter(niveau.libelle)).join(', ')}</div>}
              </div>
              <div className={styles.fieldStatutsPro}>
                <span className={styles.fieldLabel}>Statuts professionnels :</span>
                {statuts && <div className={styles.fieldContent}>{statuts.map((statut) => capitalizeFirstLetter(statut.libelle)).join(', ')}</div>}
              </div>
            </div>
          </section>
          {natureTravail &&
            <section className={styles.section}>
              <details className={styles.disclosureSection} open={true}>
                <summary className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Nature du travail</h2>
                  <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
                </summary>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: natureTravail }}/>
              </details>
            </section>
          }
          {competences &&
            <section className={styles.section}>
              <details className={styles.disclosureSection}>
                <summary className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Compétences requises</h2>
                  <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
                </summary>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: competences }}/>
              </details>
            </section>
          }
          {conditionTravail &&
            <section className={styles.section}>
              <details className={styles.disclosureSection}>
                <summary className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Lieu d&apos;exercice et status</h2>
                  <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
                </summary>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: conditionTravail }} />
              </details>
            </section>
          }
          {vieProfessionnelle &&
            <section className={styles.section} >
              <details className={styles.disclosureSection}>
                <summary className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Carrière et salaire</h2>
                  <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
                </summary>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: vieProfessionnelle }} />
              </details>
            </section>
          }
          {accesMetier &&
            <section className={styles.section}>
              <details className={styles.disclosureSection}>
                <summary className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Accès au métier</h2>
                  <Icon className={styles.sectionDisclosureIcon} name="angle-down" />
                </summary>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: accesMetier }} />
              </details>
            </section>
          }
          {centresInteret && centresInteret.length > 0 &&
            <section className={styles.section}>
              <h2 className={styles.lastSectionTitle}>Centres d&apos;intérêt</h2>
              <div className={styles.sectionContent}>
                <TagList list={centresInteret.map((centre) => capitalizeFirstLetter(centre.libelle))} />
              </div>
            </section>
          }
        </Container>
      </main>
    </>
  );
}

interface FicheMetierContext extends ParsedUrlQuery {
	id: string
}

export async function getStaticProps(context: GetStaticPropsContext<FicheMetierContext>): Promise<GetStaticPropsResult<ConsulterFicheMetierPageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }

  const { id } = context.params;
  const response = await dependencies.cmsDependencies.consulterFicheMetier.handle(id);

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }
	
  return {
    props: {
      ficheMetier: JSON.parse(JSON.stringify(response.result)),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
