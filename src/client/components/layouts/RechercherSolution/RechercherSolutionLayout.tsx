import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

interface RechercherSolutionLayoutProps {
  bannière: React.ReactNode
  erreurRecherche?: ErreurMétier
  étiquettesRecherche: React.ReactNode
  formulaireRecherche: React.ReactNode
  isLoading: boolean
  messageRésultatRecherche: string
  nombreSolutions: number
  paginationOffset?: number
  maxPage?: number
  listeSolutionElement: React.ReactElement
}

export function RechercherSolutionLayout(props: RechercherSolutionLayoutProps) {
  const {
    bannière,
    erreurRecherche,
    étiquettesRecherche,
    formulaireRecherche,
    messageRésultatRecherche,
    nombreSolutions,
    paginationOffset,
    maxPage,
    isLoading,
    listeSolutionElement,
  } = props;

  const router = useRouter();
  const hasRouterQuery = Object.keys(router.query).length > 0;

  return (
    <>
      {bannière}
      <div className={styles.rechercheSolution} aria-busy={isLoading} aria-live="polite">
        <div className={'separator'}>
          <Container className={styles.rechercheSolutionFormWrapper}>
            {formulaireRecherche}
          </Container>
        </div>

        {hasRouterQuery &&
          <>
            {erreurRecherche || nombreSolutions === 0 && !isLoading
              ? <ErrorComponent errorType={erreurRecherche}/>
              : <>
                <div className={'separator'}>
                  <Container className={styles.informationRésultat}>
                    {étiquettesRecherche}
                    <Skeleton type="line" isLoading={isLoading} className={styles.nombreRésultats}>
                      <h2>{messageRésultatRecherche}</h2>
                    </Skeleton>
                  </Container>
                </div>

                <div className={classNames(styles.listeSolutionsWrapper, 'background-white-lilac')}>
                  <Container>
                    <Skeleton type="card" isLoading={isLoading} repeat={2} className={styles.listeSolutions}>
                      {listeSolutionElement}
                    </Skeleton>
                    {paginationOffset && nombreSolutions > paginationOffset &&
                      <div className={styles.pagination}>
                        <Pagination
                          numberOfResult={nombreSolutions}
                          numberOfResultPerPage={paginationOffset}
                          maxPage={maxPage}
                        />
                      </div>
                    }
                  </Container>
                </div>
              </>
            }
          </>
        }
      </div>
    </>
  );
}
