import { GetStaticPropsResult } from 'next';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Button } from '~/client/components/ui/Button/Button';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { dependencies } from '~/server/start';

import styles from './decouvrir-les-metiers.module.scss';

interface RechercherFicheMetierProps {
  fichesMetier: FicheMétier[]
  totalNumberOfResult: number
}

export default function RechercherFicheMetierPage({ fichesMetier, totalNumberOfResult }: RechercherFicheMetierProps) {
  const card = (résultat: FicheMétier) => (
    <Link href={'/'}>
      <div className={styles.cardTitle}>{résultat.nomMetier[0].toUpperCase() + résultat.nomMetier.slice(1)}</div>
      <div className={styles.cardContent} dangerouslySetInnerHTML={{ __html: résultat.accrocheMetier }}/>
      <div className={styles.cardLink}>
        <span>En savoir plus</span>
        <AngleRightIcon className={styles.cardLinkIcon}/>
      </div>
    </Link>
  );

  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"/>
      <Hero>Découvrez les métiers</Hero>
      <Container className={styles.form}>
        <label className={styles.inputLabelRecherche} placeholder="Exemple: cuisinier">Indiquez le métier que vous recherchez</label>
        <input type='text' className={styles.inputRecherche}/>
        <Button buttonType='primary'>
          <span>Rechercher</span>
          <MagnifyingGlassIcon className={styles.submitButtonIcon} />
        </Button>
      </Container>
      <div className={styles.container}>
        <Container>
          <ol className={styles.resultList}>
            {fichesMetier.map((ficheMetier) =>
              <li className={styles.resultCard} key={ficheMetier.id}>{card(ficheMetier)}</li>,
            )}
          </ol>
          <Pagination numberOfResult={fichesMetier.length} numberOfResultPerPage={totalNumberOfResult} />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<RechercherFicheMetierProps>> {
  const response = await dependencies.fichesMetierDependencies.rechercherFicheMetier.handle('');

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }
  
  return {
    props: {
      fichesMetier: JSON.parse(JSON.stringify(response.result.results)),
      totalNumberOfResult: response.result.estimatedTotalResults,
    }, 
    revalidate: false,
  };
}
