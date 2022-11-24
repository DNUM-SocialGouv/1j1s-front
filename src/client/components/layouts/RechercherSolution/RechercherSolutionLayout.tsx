import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

import { Skeleton } from '../../ui/Loader/Skeleton/Skeleton';

export interface LienSolution {
  id: string
  lienOffre: string
  intituléOffre: string
  logoEntreprise: string
  nomEntreprise?: string
  étiquetteOffreList: string[]
  horaires?: ÉtablissementAccompagnement.Horaire[]
}

interface RechercherSolutionLayoutProps<T> {
  bannière: React.ReactNode
  erreurRecherche?: ErreurMétier
  étiquettesRecherche: React.ReactNode
  formulaireRecherche: React.ReactNode
  isLoading: boolean
  listeSolution: T[]
	ariaLabelListeSolution?: string
  messageRésultatRecherche: string
  nombreSolutions: number
  paginationOffset?: number
  maxPage?: number
  mapToLienSolution(data: T): LienSolution
  displaySolution?(lienSolution: LienSolution): React.ReactNode
}

function defaultDisplaySolution(lienSolution: LienSolution): React.ReactNode {
  return (
    <li key={lienSolution.id}>
      <RésultatRechercherSolution
        lienOffre={lienSolution.lienOffre}
        intituléOffre={lienSolution.intituléOffre}
        logoEntreprise={lienSolution.logoEntreprise}
        nomEntreprise={lienSolution.nomEntreprise}
        étiquetteOffreList={lienSolution.étiquetteOffreList}
        horaires={lienSolution.horaires}
      />
    </li>
  );
}

export function RechercherSolutionLayout<T>(props: RechercherSolutionLayoutProps<T>) {
  const {
    bannière,
    erreurRecherche,
    étiquettesRecherche,
    formulaireRecherche,
    listeSolution,
	  ariaLabelListeSolution,
    messageRésultatRecherche,
    mapToLienSolution,
    nombreSolutions,
    paginationOffset,
    maxPage,
    isLoading,
    displaySolution = defaultDisplaySolution,
  } = props;

  const router = useRouter();
  const hasRouterQuery = Object.keys(router.query).length > 0;

  const displaySolutionList = (displaySolution: (lienSolution: LienSolution) => React.ReactNode) => (
	  <ul aria-label={ariaLabelListeSolution}>
      {
        listeSolution.map(mapToLienSolution).map((lienSolution: LienSolution) => displaySolution(lienSolution))
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
                      {displaySolutionList(displaySolution)}
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
