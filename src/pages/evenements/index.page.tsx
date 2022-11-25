import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';
import classNames from 'classnames';
import React from 'react';
import {
  Configure,
  CurrentRefinements,
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

import { Evenement } from '~/client/components/features/Evenement/Evenement.type';
import { RésultatRechercherEvenement } from '~/client/components/features/Evenement/RésultatRechercherEvenement';
import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { MeilisearchStats } from '~/client/components/ui/Meilisearch/MeilisearchStats';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import styles from '~/pages/evenements/RechercherEvenementPage.module.scss';

const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'evenement:dateDebut:asc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const LIMIT_MAX_FACETS = 10000;
const STATUS_LOADING = 'loading';

export default function PageEvenements() {
  const displayRechercheEvenement = process.env.NEXT_PUBLIC_RECHERCHE_EVENEMENT_FEATURE === '1';
  const searchClient = useDependency<SearchClient>('rechercheClientService');

  function disableEnterKey() {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key == KeyBoard.ENTER) {
        e.preventDefault();
      }
    };
  }

  const Résultat = ({ hit: résultat }: { hit: Evenement }) => {
    return <RésultatRechercherEvenement
      titreEvenement={résultat.titreEvenement}
      organismeOrganisateur={résultat.organismeOrganisateur}
      dateDebut={résultat.dateDebut}
      dateFin={résultat.dateFin}
      lieuEvenement={résultat.lieuEvenement}
      slug={résultat.slug}
    />;
  };

  function AfficherListeDeRésultats() {
    const { status } = useInstantSearch();

    return <div className={classNames(styles.evenementListeResultatsWrapper, 'background-white-lilac')}>
      <Container>
        <Skeleton type='card' isLoading={status === STATUS_LOADING} repeat={2}>
          <></>
        </Skeleton>
        <Hits
          hitComponent={Résultat}
          classNames={{ root: styles.evenementListeRoot }}
        />
        <div className={styles.paginationContainer}>
          <MeiliSearchCustomPagination
            padding={0}
            numberOfResultPerPage={HITS_PER_PAGE}
          />
        </div>
      </Container>
    </div>;
  }

  return (
    <>
      {
        !displayRechercheEvenement && <>
          <HeadTag title={'Trouver un évènement Emploi | 1jeune1solution'}/>
          <main id='contenu'>
            <HeroWithButtonLink
              titlePrimaryText="Des centaines d'événements de recrutement "
              titleSecondaryText="pour tous les jeunes, partout en France"
              content='À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !'
              buttonLabel='Je trouve un événement Pôle Emploi'
              buttonLabelSecondary='Je trouve un événement ma Mission Locale'
              buttonHref='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
              buttonHrefSecondary='https://40-ans.unml.info/le-programme'
              imgSrc='/images/évènements.webp'/>
          </main>
        </>
      }
      {displayRechercheEvenement && <>
        <HeadTag
          title={'Rechercher un évènement | 1jeune1solution'}
          description="Des centaines d'évènements de recrutement pour tous les jeunes, partout en France"/>
        <main id="contenu">
          <LightHero
            primaryText="Des centaines d'évènements de recrutement"
            secondaryText="pour tous les jeunes, partout en France"
          />
          <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX}
            routing={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}>
            <Configure hitsPerPage={HITS_PER_PAGE}/>
            <div className={'separator'}>
              <Container className={styles.evenementFormWrapper}>
                <form className={styles.evenementForm}>
                  <div className={styles.formWrapper}>
                    <div>
                      <label>Mot-clé, métier, accompagnement…</label>
                      <SearchBox
                        onKeyDown={disableEnterKey()}
                        className='recherche-principale-evenement'
                        placeholder="Exemples: gendarmerie, cuisinier, mentorat"
                        classNames={
                          {
                            input: ['fr-input', styles.evenementInput].join(' '),
                            loadingIcon: styles.none,
                            reset: styles.none,
                            submit: styles.none,
                            submitIcon: styles.none,
                          }
                        }
                      />
                    </div>
                    <MeilisearchInputRefinement attribute={'lieuEvenement'}
                      limit={LIMIT_MAX_FACETS}/>
                  </div>
                </form>
              </Container>
            </div>
            <div className={'separator'}>
              <Container>
                <div className={styles.informationRésultats}>
                  <CurrentRefinements
                    transformItems={(items) => {
                      return items
                        .map((item) => ({
                          ...item,
                          refinements: item.refinements
                            .map((refinement) => ({
                              ...refinement,
                              label: getCapitalizedItems(refinement.label),
                            })),
                        }));
                    }}
                    classNames={
                      {
                        category: styles.evenementTagCategory,
                        categoryLabel: styles.evenementTagItem,
                        item: styles.evenementTagItem,
                        label: styles.none,
                        noRefinementList: styles.none,
                        noRefinementRoot: styles.none,
                      }
                    }/>
                  <MeilisearchStats labelSingulier='évènement' labelPluriel='évènements'/>
                </div>
              </Container>
            </div>
            <AfficherListeDeRésultats/>
          </InstantSearch>
        </main>
      </>
      }
    </>
  );
}
