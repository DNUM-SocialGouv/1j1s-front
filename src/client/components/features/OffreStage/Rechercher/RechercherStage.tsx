import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch/src/types';
import instantsearch from 'instantsearch.js';
import { hits, searchBox } from 'instantsearch.js/es/widgets';
import React, { useEffect } from 'react';

export default function RechercherStage() {
  const meiliSearchClient: InstantMeiliSearchInstance = instantMeiliSearch(
    'http://localhost:7700',
    'masterKey',
    {
      placeholderSearch: true,
    },
  );

  const search = instantsearch({
    indexName: 'stages',
    searchClient: meiliSearchClient,
  });

  let alreadyLogged = false;

  useEffect(() => {
    if (alreadyLogged) {
      return;
    }

    alreadyLogged = true;
    search.addWidgets([
      searchBox({
        container: '#search-box',
        placeholder: 'Search for products',
        showLoadingIndicator: true,
      }),
      hits({
        container: '#hits',
        templates: {
          item: `
            <div>
            <a href='/stages/{{id}}'>{{titre}}</a>
              <div class="hit-name">
                {{#helpers.highlight}}{ "attribute": "titre" }{{/helpers.highlight}}
              </div>
              <div class="hit-description">
                {{#helpers.snippet}}{ "attribute": "description" }{{/helpers.snippet}}
              </div>
            </div>
          `,
        },
      }),
    ]);

    search.start();
  });

  return (
    <div className={'searchInternshipOffer'}>
      <label htmlFor={'search-box'}/>
      <div id="search-box" style={{ border: '1px black solid', height: '100px' }}></div>
      <div id="hits"></div>
    </div>
  );
}
