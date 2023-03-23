import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { Tab, TabPanel, Tabs, TabsLabel } from '~/client/components/ui/Tab/Tab';
import { Erreur } from '~/server/errors/erreur.types';

interface RechercherSolutionLayoutWithTabsProps {
	bannière: React.ReactElement
	erreurRecherche?: Erreur
	étiquettesRecherche?: React.ReactElement
	formulaireRecherche: React.ReactElement
	isLoading: boolean
	messageRésultatRecherche: string
	nombreSolutions: number
	paginationOffset?: number
	maxPage?: number
	listeSolutionElementTab: Array<{
		label: string
		listeSolutionElement: React.ReactElement
	}>
}

export function RechercherSolutionLayoutWithTabs(props: RechercherSolutionLayoutWithTabsProps) {
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
		listeSolutionElementTab,
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
            			<Container className={styles.informationRésultat}>
            				{étiquettesRecherche}
            				<Skeleton type="line" isLoading={isLoading} className={styles.nombreRésultats}>
            					<h2>{messageRésultatRecherche}</h2>
            				</Skeleton>
            			</Container>

            			<div>
            				<Skeleton type="card" isLoading={isLoading} repeat={2} className={styles.listeSolutions}>
            					<>
            						<Tabs>
            							<TabsLabel>
            								{listeSolutionElementTab.map((solutionElement) => <Tab
            									key={solutionElement.label}>{solutionElement.label}</Tab>)}
            							</TabsLabel>
            							{listeSolutionElementTab.map((solutionElement) => (
            								<TabPanel key={solutionElement.label}>
            									{solutionElement.listeSolutionElement}
            								</TabPanel>
            							))}
            						</Tabs>
            					</>
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
            			</div>
            		</>
            	}
            </>
				}
			</div>
		</>
	);
}
