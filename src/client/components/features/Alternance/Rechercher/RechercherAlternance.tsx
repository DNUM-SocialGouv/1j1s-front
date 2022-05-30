import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr';
import React, { FormEvent, useState } from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/RechercherAlternance.module.css';
import {
  RésultatRechercherAlternance,
} from '~/client/components/features/Alternance/Rechercher/Résultat/RésultatRechercherAlternance';
import {
  AutoCompletionForMétierRecherché,
} from '~/client/components/ui/AutoCompletion/AutoCompletionForMétierRecherché';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { getFormValue, transformFormToEntries } from '~/client/utils/form.util';
import { Alternance } from '~/server/alternances/domain/alternance';

export function RechercherAlternance() {
  const alternanceService  = useDependency('alternanceService') as AlternanceService;

  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [inputIntituleMétier, setInputIntituleMétier] = useState<string>('');
  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);

  async function rechercherAlternance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const codeRomeList = getFormValue(event.currentTarget, 'codeRomes');
    const intituléMétierSélectionné = getFormValue(event.currentTarget, 'métierSélectionné');
    if(codeRomeList === undefined || codeRomeList.length === 0) {
      console.log('PASSE');
      setInputIntituleMétierObligatoireErrorMessage(true);
    } else {
      if(codeRomeList) {
        setIsLoading(true);
        const query = new URLSearchParams(transformFormToEntries(event.currentTarget, 'métierSélectionné')).toString();
        const response = await alternanceService.rechercherAlternance(query);
        setNombreRésultats(response.nombreRésultats);
        setInputIntituleMétier(intituléMétierSélectionné ? intituléMétierSélectionné : '...');
        setAlternanceList(response.résultats);
        setIsLoading(false);
      }
    }
  }

  function resetHandleErrorMessageActive() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  return (
    <main id="contenu">
      <Hero>
        <Title as="h1" look="h3">
          Avec la Bonne Alternance, trouvez l’entreprise qu’il vous faut pour réaliser votre projet d’alternance
        </Title>
      </Hero>

      <form
        className={styles.rechercheAlternance}
        onSubmit={rechercherAlternance}
        role="search"
      >
        <AutoCompletionForMétierRecherché
          className={styles.rechercheAlternanceInput}
          inputName="Métier"
          handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
          resetHandleErrorMessageActive={resetHandleErrorMessageActive}
        />

        <ButtonGroup size="md">
          <Button
            submit={true}
            icon="ri-search-line"
            iconPosition="right"
            data-testid="ButtonRechercherAlternance"
            className={styles.buttonRechercher}
          >
            Rechercher
          </Button>
        </ButtonGroup>
      </form>

      {
        !isLoading && nombreRésultats !== 0 &&
        <div className={styles.nombreRésultats} data-testid="RechercheAlternanceNombreRésultats">
          <h2>{nombreRésultats} offres d&apos;alternances pour {inputIntituleMétier}</h2>
        </div>
      }

      {isLoading && <p>Recherche des offres</p>}
      {
        alternanceList.length > 0 && !isLoading &&
        <ul className={styles.résultatRechercheAlternanceList}>
          {alternanceList.map((alternance: Alternance) => (
            <li key={alternance.id}>
              <RésultatRechercherAlternance alternance={alternance}/>
            </li>
          ))}
        </ul>
      }
    </main>
  );
}
