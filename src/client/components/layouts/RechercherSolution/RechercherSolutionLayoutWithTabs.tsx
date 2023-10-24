import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
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
	paginationOffset?: number
	maxPage?: number
	listeSolutionElementTab: Array<{
		label: string
		listeSolutionElement: React.ReactElement
		messageResultatRecherche: string
		messageNoResult?: React.ReactElement
		nombreDeSolutions: number
	}>
}

export function RechercherSolutionLayoutWithTabs(props: RechercherSolutionLayoutWithTabsProps) {
	const {
		bannière,
		erreurRecherche,
		étiquettesRecherche,
		formulaireRecherche,
		paginationOffset,
		maxPage,
		isLoading,
		listeSolutionElementTab,
	} = props;

	const router = useRouter();
	const hasRouterQuery = Object.keys(router.query).length > 0;
	const [currentTab, setCurrentTab] = useState<number>(0);
	const messageResultatRechercheCurrentTab = listeSolutionElementTab[currentTab].messageResultatRecherche;
	const messageNoResult = listeSolutionElementTab[currentTab].messageNoResult ?? <NoResultErrorMessage/>;
	const shouldDisplayPagination = paginationOffset && listeSolutionElementTab[currentTab].nombreDeSolutions > paginationOffset;
	const hasSolutionsInCurrentTab = listeSolutionElementTab[currentTab].nombreDeSolutions > 0;


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
            	{erreurRecherche ? <ErrorComponent errorType={erreurRecherche}/>
            		: <>
            			<Container className={styles.informationRésultat}>
            				{étiquettesRecherche}
            				{(hasSolutionsInCurrentTab || isLoading) &&
                        <Skeleton type="line" isLoading={isLoading} className={styles.nombreRésultats}>
                        	<h2>{messageResultatRechercheCurrentTab}</h2>
                        </Skeleton>
            				}
            			</Container>

            			<Container>
            				<Skeleton type="card" isLoading={isLoading} repeat={2} className={styles.listeSolutions}>
            					<>
            						<Tabs onTabChange={setCurrentTab} currentIndex={currentTab}>
            							<TabsLabel>
            								{listeSolutionElementTab.map((solutionElement) => (
            									<Tab
            										key={solutionElement.label}>
            										{solutionElement.label}
            									</Tab>))}
            							</TabsLabel>
            							{listeSolutionElementTab.map((solutionElement) => (
            								<TabPanel key={solutionElement.label}>
            									{hasSolutionsInCurrentTab ?
            										solutionElement.listeSolutionElement
            										: messageNoResult
            									}
            								</TabPanel>
            							))}
            						</Tabs>
            					</>
            				</Skeleton>
            				{shouldDisplayPagination &&
                        <div className={styles.pagination}>
                        	<Pagination
                        		numberOfResult={listeSolutionElementTab[currentTab].nombreDeSolutions}
                        		numberOfResultPerPage={paginationOffset}
                        		maxPage={maxPage}
                        	/>
                        </div>
            				}
            			</Container>
            		</>
            	}
            </>
				}
			</div>
		</>
	);
}
