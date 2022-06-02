import { Button, Title } from '@dataesr/react-dsfr';
import React, { FormEvent, useState } from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/RechercherAlternance.module.css';
import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import { AutoCompletionForMétierRecherché } from '~/client/components/ui/AutoCompletion/AutoCompletionForMétierRecherché';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { getFormValue, transformFormToEntries } from '~/client/utils/form.util';
import { Alternance } from '~/server/alternances/domain/alternance';

export function RechercherAlternance() {
  const alternanceService  = useDependency<AlternanceService>('alternanceService');

  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [inputIntituleMétier, setInputIntituleMétier] = useState<string>('');
  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);
  const defaultLogo = '/images/logos/la-bonne-alternance.svg';

  async function rechercherAlternance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const codeRomeList = getFormValue(event.currentTarget, 'codeRomes');
    const intituléMétierSélectionné = getFormValue(event.currentTarget, 'métierSélectionné');
    if(!codeRomeList?.length) {
      setInputIntituleMétierObligatoireErrorMessage(true);
    } else {
      setIsLoading(true);
      const query = new URLSearchParams(transformFormToEntries(event.currentTarget, 'métierSélectionné')).toString();
      const response = await alternanceService.rechercherAlternance(query);
      setNombreRésultats(response.nombreRésultats);
      setInputIntituleMétier(intituléMétierSélectionné || '...');
      setAlternanceList(response.résultats);
      setIsLoading(false);
    }
  }

  function resetHandleErrorMessageActive() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  return (
    <main id="contenu" className={commonStyles.container}>
      <Hero>
        <Title as="h1" look="h3">
          Avec la Bonne Alternance, trouvez l’entreprise qu’il vous faut pour réaliser votre projet d’alternance
        </Title>
      </Hero>
      <div className={commonStyles.layout}>
        <form
          className={commonStyles.rechercheOffreForm}
          onSubmit={rechercherAlternance}
          role="search"
        >
          <div className={commonStyles.inputButtonWrapper}>
            <AutoCompletionForMétierRecherché
              className={styles.rechercheAlternanceInput}
              inputName="Métier"
              handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
              resetHandleErrorMessageActive={resetHandleErrorMessageActive}
            />

            <Button
              submit={true}
              icon="ri-search-line"
              iconPosition="right"
              data-testid="ButtonRechercherAlternance"
              className={commonStyles.buttonRechercher}
            >
              Rechercher
            </Button>
          </div>
        </form>

        { isLoading && <p>Recherche des offres en attente de loader</p>}
        {
          !isLoading && nombreRésultats !== 0 &&
          <div className={commonStyles.nombreRésultats} data-testid="RechercheAlternanceNombreRésultats">
            <h2>{nombreRésultats} contrats d&apos;alternances pour {inputIntituleMétier}</h2>
          </div>
        }

        {alternanceList.length > 0 && !isLoading &&
          <ul className={commonStyles.résultatRechercheOffreList}>
            {alternanceList.map((alternance: Alternance) => (
              <li key={alternance.id}>
                <RésultatRechercherOffre
                  lienOffre={`/apprentissage/${alternance.id}`}
                  intituléOffre={alternance.intitulé}
                  logoEntreprise={alternance.entreprise.logo || defaultLogo}
                  nomEntreprise={alternance.entreprise?.nom}
                  descriptionOffre={alternance.description}
                  étiquetteOffreList={[]}
                />
              </li>
            ))}
          </ul>
        }
      </div>
    </main>
  );
}