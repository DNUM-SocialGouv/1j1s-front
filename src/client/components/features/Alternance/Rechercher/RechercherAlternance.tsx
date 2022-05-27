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
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { getValueFromForm, transformFormToEntries } from '~/client/utils/form.util';
import { Alternance } from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export function RechercherAlternance() {
  const alternanceService  = useDependency('alternanceService') as AlternanceService;
  const métierRecherchéService  = useDependency('métierRecherchéService') as MétierRecherchéService;

  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [inputIntituleMétier, setInputIntituleMétier] = useState<string>('');
  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);
  const [métierRecherchéSuggestionList, setMétierRecherchéSuggestionList] = useState<MétierRecherché[]>([]);


  async function rechercherIntituléMétier(intitulé: string) {
    setInputIntituleMétier(intitulé);
    const response = await métierRecherchéService.rechercherMétier(intitulé);
    setMétierRecherchéSuggestionList(response);
  }

  async function rechercherAlternance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(inputIntituleMétier.length === 0) {
      setInputIntituleMétierObligatoireErrorMessage(true);
    } else {
      const formEntries = transformFormToEntries(event.currentTarget);
      if(getValueFromForm(event.currentTarget, 'codeRomes')) {
        setIsLoading(true);
        const query = new URLSearchParams(formEntries).toString();
        const response = await alternanceService.rechercherAlternance(query);
        setNombreRésultats(response.nombreRésultats);
        setAlternanceList(response.résultats);
        setIsLoading(false);
      }
    }
  }

  function resetErrorMessage() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  return (
    <main id="contenu">
      <Hero>
        <Title as="h1" look="h3">
          Des milliers d’offres d’alternances sélectionnées pour vous par La Bonne Alternance
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
          suggestionList={métierRecherchéSuggestionList}
          onChange={rechercherIntituléMétier}
          resetErrorMessageActive={resetErrorMessage}
          handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
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
        nombreRésultats !== 0 &&
        <div className={styles.nombreRésultats} data-testid="RechercheAlternanceNombreRésultats">
          <h2>{nombreRésultats} offres d&apos;alternances pour {inputIntituleMétier}</h2>
        </div>
      }

      {isLoading && <p>Recherche des offres</p>}
      {
        alternanceList.length > 0 && !isLoading &&
        <ul className={styles.résultatRechercheAlternanceList}>
          {alternanceList.map((alternance: Alternance) => {
            return (
              <li key={alternance.id}>
                <RésultatRechercherAlternance alternance={alternance}/>
              </li>
            );
          })}
        </ul>
      }
    </main>
  );
}
