import { useRouter } from 'next/router';
import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.css';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { ErrorType } from '~/server/errors/error.types';

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
  erreurRecherche?: ErrorType
  étiquettesRecherche: React.ReactNode
  formulaireRecherche: React.ReactNode
  isLoading: boolean
  listeSolution: T[]
  messageRésultatRecherche: string
  nombreSolutions: number
  paginationOffset?: number
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
  } = props;
  const router = useRouter();

  const hasRouterQuery = Object.keys(router.query).length > 0;

  return (
    <>
      {bannière}
      <div className={styles.rechercheSolution}>
        {formulaireRecherche}
        {
          // TODO: add loading as attribute
          hasRouterQuery &&

          <>
            {!erreurRecherche && listeSolution.length > 0 ?
              <>
                {étiquettesRecherche}
                <div className={styles.nombreRésultats}>
                  <h2>{messageRésultatRecherche}</h2>
                </div>
                <ul className={styles.listeSolutions}>
                  {listeSolution.map(mapToLienSolution).map((lienSolution: LienSolution) => (
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
                  ))}
                </ul>
                {paginationOffset && nombreSolutions > paginationOffset &&
                  <div className={styles.pagination}>
                    <Pagination itemListLength={nombreSolutions} itemPerPage={paginationOffset}/>
                  </div>
                }
              </> :
              <ErrorComponent errorType={erreurRecherche}/>
            }
          </>
        }
      </div>
    </>
  );
}
