import classNames from 'classnames';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';

import {
	FormulaireRechercheAlternanceLBA,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternanceLBA';
import {
	RésultatRechercherAlternance,
} from '~/client/components/features/Alternance/Résultat/RésultatRechercherAlternance';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout.module.scss';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Alternance } from '~/server/alternances/domain/alternance';
import { Erreur } from '~/server/errors/erreur.types';

const PREFIX_TITRE_PAGE = 'Rechercher une alternance';

export function RechercherAlternance() {
	const router = useRouter();
	const hasRouterQuery = Object.keys(router.query).length > 0;

	const alternanceService = useDependency<AlternanceService>('alternanceService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);


	useEffect(() => {
		const queryString = stringify(router.query);

		if (queryString !== '') {
			setIsLoading(true);
			setErreurRecherche(undefined);

			// alternanceService.rechercherAlternance(queryString)
			// 	.then((response) => {
			// 		if (response.instance === 'success') {
			// 			setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.length === 0 ? ' - Aucun résultat' : ''}`));
			// 			setAlternanceList(response.result);
			// 			setNombreRésultats(response.result.length);
			// 		} else {
			// 			setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
			// 			setErreurRecherche(response.errorType);
			// 		}
			// 		setIsLoading(false);
			// 	});
		}
		setAlternanceList([
			{
				localisation: 'Localisation',
				niveauRequis: 'Niveau demandé',
				nomEntreprise: 'Nom de l’entreprise 1',
				titre: 'Intitulé du poste en alternance 1',
				typeDeContrat: 'Type de contrat',
			}, {
				titre: 'Intitulé du poste en alternance 2',
			},
		]);
		setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}`));
		setNombreRésultats(2);
		setIsLoading(false);
	}, [router.query, alternanceService]);

	return (
		<>
			<Head
				title={'Rechercher une alternance | 1jeune1solution'}
				description="Des milliers d’alternances sélectionnées pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Avec La Bonne Alternance, trouvez l’entreprise qu’il vous faut</LightHeroPrimaryText>
						<LightHeroSecondaryText>pour réaliser votre projet d’alternance</LightHeroSecondaryText>
					</h1>
				</LightHero>
				<div className={styles.rechercheSolution} aria-busy={isLoading} aria-live="polite">
					<div className={'separator'}>
						<Container className={styles.rechercheSolutionFormWrapper}>
							<FormulaireRechercheAlternanceLBA/>
						</Container>
					</div>
					  <>
						  {erreurRecherche && !isLoading
							  ? <ErrorComponent errorType={erreurRecherche}/>
							  : <>
								  <div className={'separator'}>
									  <Container className={styles.informationRésultat}>
										  <Skeleton type="line" isLoading={isLoading} className={styles.nombreRésultats}>
											  <h2>{'messageRésultatRecherche'}</h2>
										  </Skeleton>
									  </Container>
								  </div>

								  <div className={classNames(styles.listeSolutionsWrapper, 'background-white-lilac')}>
					  				<Container>
					  					<Skeleton type="card" isLoading={isLoading} repeat={2} className={styles.listeSolutions}>
											  <ul>
												  {alternanceList.map((alternance) => (
					  								<li key={alternance.titre}>
					  									<RésultatRechercherAlternance
					  										alternance={alternance}
					  									/>
					  								</li>
												  ))}
											  </ul>
					  					</Skeleton>
					  				</Container>
								  </div>
							  </>
						  }
					  </>
				</div>
			</main>
		</>
	);
}
