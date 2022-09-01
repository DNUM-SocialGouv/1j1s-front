import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { TextInput } from '~/client/components/ui/Text/TextInput';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { getFormAsQuery } from '~/client/utils/form.util';
import { getQueryValue } from '~/client/utils/queryParams.utils';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import styles from './decouvrir-les-metiers.module.scss';

export default function RechercherFicheMetierPage() {
  const router = useRouter();
  const [ficheMétiers, setFicheMétiers] = useState<Partial<FicheMétier>[]>([]);
  const [totalNumberOfResult, setTotalNumberOfResult] = useState(0);
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fichesMetierService  = useDependency<FicheMetierService>('ficheMetierService');

  const ficheMétierCard = (résultat: Partial<FicheMétier>) => (
    <Link href={'/'}>
      <div className={styles.cardTitle}>{`${résultat.nomMetier?.charAt(0).toUpperCase()}${résultat.nomMetier?.slice(1)}`}</div>
      <div className={styles.cardContent} dangerouslySetInnerHTML={{ __html: résultat.accrocheMetier || '' }}/>
      <div className={styles.cardLink}>
        <span>En savoir plus</span>
        <AngleRightIcon className={styles.cardLinkIcon}/>
      </div>
    </Link>
  );

  useEffect (() => {
    setIsLoading(true);
    const queryString = stringify(router.query);
    fichesMetierService.rechercherFichesMétier(queryString).then((response) => {
      if (response.instance === 'success') {
        setFicheMétiers(response.result.results);
        setTotalNumberOfResult(response.result.estimatedTotalResults);
      }
      setIsLoading(false);
    });
  }, [ficheMétiers.length, fichesMetierService, router.query, totalNumberOfResult]);

  useEffect(() => {
    setInputMotCle(getQueryValue(router.query, 'motCle') || '');
  }, [router.query]);

  async function updateQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"/>
      <div className={styles.heroSection}>
        <Container>
          <div className={styles.heroMessage}>
            <span className={styles.heroMessageFirstPart}>Trouvez le métier</span>
            <span className={styles.heroMessageSecondPart}>qui vous correspond</span>
          </div>
        </Container>
      </div>
      <div className={styles.headingSection}>
        <Container className={styles.formContainer}>
          <form className={styles.form} role='form' onSubmit={updateQueryParams}>
            <TextInput
              name="motCle"
              className={styles.inputNomMetier}
              label="Indiquez le métier que vous recherchez"
              placeholder="Exemple: cuisinier"
              value={inputMotCle}
              autoFocus
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value) } />
            <Button
              buttonType='withRightIcon'
              icon={<MagnifyingGlassIcon />}
              type='submit'>
              Rechercher
            </Button>
          </form>
        </Container>
      </div>
      <div className={styles.resultInfosContainer}>
        <Container>
          <Skeleton type="line" isLoading={isLoading}>
            <div><strong>{totalNumberOfResult}</strong> fiches métiers</div>
          </Skeleton>
        </Container>
      </div>
      <div className={styles.bodySection}>
        <Container>
          <Skeleton type="card" isLoading={isLoading} repeat={2} className={styles.skeletonCards}>
            <ol className={styles.resultList}>
              {ficheMétiers.map((ficheMetier) =>
                <li className={styles.resultCard} key={ficheMetier.id}>{ficheMétierCard(ficheMetier)}</li>,
              )}
            </ol>
          </Skeleton>
          { totalNumberOfResult > 0 && ficheMétiers.length > 0 &&
            <Pagination numberOfResult={totalNumberOfResult} numberOfResultPerPage={ficheMétiers.length} />
          }
        </Container>
      </div>
    </>
  );
}
