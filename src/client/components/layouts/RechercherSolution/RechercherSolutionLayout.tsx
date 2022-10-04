import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { Skeleton } from '../../ui/Loader/Skeleton/Skeleton';

export interface LienSolution {
  id: string
  lienOffre: string
  intituléOffre: string
  descriptionOffre?: string
  logoEntreprise: string
  nomEntreprise?: string
  étiquetteOffreList: string[]
}

interface RechercherSolutionLayoutProps<T> {
  bannière: React.ReactNode
  erreurRecherche?: ErreurMétier
  étiquettesRecherche: React.ReactNode
  formulaireRecherche: React.ReactNode
  isLoading: boolean
  listeSolution: T[]
  messageRésultatRecherche: string
  nombreSolutions: number
  paginationOffset?: number
  maxPage?: number
  hasSample: boolean
  mapToLienSolution(data: T): LienSolution
}

export function RechercherSolutionLayout<T>(props: RechercherSolutionLayoutProps<T>) {
  const {
    bannière,
    erreurRecherche,
    étiquettesRecherche,
    formulaireRecherche,
    listeSolution,
    messageRésultatRecherche,
    mapToLienSolution,
    nombreSolutions,
    paginationOffset,
    maxPage,
    isLoading,
    hasSample,
  } = props;

  const router = useRouter();
  const hasRouterQuery = Object.keys(router.query).length > 0;

  const getSolutionList = () => (
    <ul>
      {
        listeSolution.map(mapToLienSolution).map((lienSolution: LienSolution) => (
          <li key={lienSolution.id}>
            <RésultatRechercherSolution
              lienOffre={lienSolution.lienOffre}
              intituléOffre={lienSolution.intituléOffre}
              logoEntreprise={lienSolution.logoEntreprise}
              nomEntreprise={lienSolution.nomEntreprise}
              descriptionOffre={lienSolution.descriptionOffre}
              étiquetteOffreList={lienSolution.étiquetteOffreList}
            />
          </li>
        ))
      }
    </ul>
  );

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
            {erreurRecherche || listeSolution.length === 0 && !isLoading
              ? <ErrorComponent errorType={erreurRecherche}/>
              : <>
                <div className={'separator'}>
                  <Container className={styles.informationRésultat}>
                    {étiquettesRecherche}
                    <Skeleton type='line' isLoading={isLoading} className={styles.nombreRésultats}>
                      <h2>{messageRésultatRecherche}</h2>
                    </Skeleton>
                  </Container>
                </div>

                <div className={classNames(styles.listeSolutionsWrapper, 'background-white-lilac')}>
                  <Container>
                    <Skeleton type='card' isLoading={isLoading} repeat={2} className={styles.listeSolutions}>
                      {getSolutionList()}
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
        { (!hasRouterQuery && hasSample && !erreurRecherche) &&
          <>
            <Container className={styles.informationRésultat}>
              <Skeleton type='line' isLoading={isLoading} className={styles.nombreRésultats}>
                <h2>{messageRésultatRecherche}</h2>
              </Skeleton>
            </Container>
            <div className={classNames(styles.listeSolutionsWrapper, 'background-white-lilac')}>
              <Container>
                <div className={styles.listeSolutions}>
                  {getSolutionList()}
                </div>
              </Container>
            </div>
          </>
        }
      </div>
    </>
  );
}
