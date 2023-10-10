import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { Erreur } from '~/server/errors/erreur.types';

interface RechercherSolutionLayoutProps {
	bannière: React.ReactElement;
	erreurRecherche?: Erreur;
	étiquettesRecherche?: React.ReactElement;
	formulaireRecherche: React.ReactElement;
	isLoading: boolean;
	messageRésultatRecherche: string | ReactElement;
	nombreSolutions: number;
	paginationOffset?: number;
	maxPage?: number;
	listeSolutionElement: React.ReactElement;
	footnote?: ReactElement;
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
		footnote,
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
				{/*FIXME (SULI 03/08/23) : ça ne doit pas être le layout qui décide d'afficher ou non en fonction de la présence de la query*/}
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
										<Skeleton type="card" isLoading={isLoading} repeat={2}
												  className={styles.listeSolutions}>
											{listeSolutionElement}
										</Skeleton>
										{footnote && <div className={styles.footnote}>{footnote}</div>}
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
