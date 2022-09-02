import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { SimulationAlternancePartner } from '~/client/components/features/Partner/SimulationAlternancePartner';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { mapAlternanceToLienSolution } from '~/client/utils/alternance.utils';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { Alternance } from '~/server/alternances/domain/alternance';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export function RechercherAlternance() {
  const router = useRouter();
  const queryParams = useAlternanceQuery();
  const alternanceService  = useDependency<AlternanceService>('alternanceService');

  const [title, setTitle] = useState<string>('Rechercher une alternance | 1jeune1solution');
  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
      setErreurRecherche(undefined);
      alternanceService.rechercherAlternance(queryString)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(getRechercherOffreHeadTagTitre(`Rechercher une alternance ${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
            setAlternanceList(response.result.résultats);
            setNombreRésultats(response.result.nombreRésultats);
          } else {
            setTitle(getRechercherOffreHeadTagTitre('Rechercher une alternance', response.errorType));
            setErreurRecherche(response.errorType);
          }
          setIsLoading(false);
        });
    }
  }, [router.query, alternanceService]);

  const messageRésultatRecherche: string = useMemo(() => {
    const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
    if (nombreRésultats > 1) {
      messageRésultatRechercheSplit.push(`contrats d'alternances pour ${queryParams.metierSelectionne}`);
    } else {
      messageRésultatRechercheSplit.push(`contrat d'alternance pour ${queryParams.metierSelectionne}`);
    }
    return messageRésultatRechercheSplit.join(' ');
  }, [nombreRésultats, queryParams.metierSelectionne]);

  const partnerCardList = [
    SimulationAlternancePartner().props,
    CIDJPartner().props,
  ];

  return (
    <>
      <HeadTag
        title={title}
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          bannière={<BannièreAlternance/>}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={<TagList list={[queryParams.libelleCommune]} aria-label="Filtres de la recherche" />}
          formulaireRecherche={<FormulaireRechercheAlternance/>}
          isLoading={isLoading}
          listeSolution={alternanceList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapAlternanceToLienSolution}
        />
        {PartnerCardList(partnerCardList)}
      </main>
    </>
  );
}

function BannièreAlternance() {
  return (
    <Hero>
      Avec la <b>Bonne Alternance</b>, trouvez l’entreprise qu’il vous faut pour <b>réaliser votre projet d’alternance</b>
    </Hero>
  );
}
