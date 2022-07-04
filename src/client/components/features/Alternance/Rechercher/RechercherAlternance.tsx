import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { FormulaireRechercheAlternance } from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import {
  ÉtiquettesRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Étiquettes/ÉtiquettesRechercherSolution';
import {
  LienSolution,
  RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { Alternance } from '~/server/alternances/domain/alternance';
import { ErrorType } from '~/server/errors/error.types';

const LOGO_ALTERNANCE = '/images/logos/la-bonne-alternance.svg';

export function RechercherAlternance() {
  const router = useRouter();
  const queryParams = useAlternanceQuery();
  const alternanceService  = useDependency<AlternanceService>('alternanceService');


  const [title, setTitle] = useState<string>('Rechercher une alternance | 1jeune1solution');
  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErrorType | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
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
    if (queryParams.metierSelectionne) {
      return `${nombreRésultats} contrats d'alternances pour ${queryParams.metierSelectionne}`;
    } else {
      return `${nombreRésultats} contrats d'alternances`;
    }
  }, [nombreRésultats, queryParams.metierSelectionne]);


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
          étiquettesRecherche={<ÉtiquettesRechercherSolution/>}
          formulaireRecherche={<FormulaireRechercheAlternance/>}
          isLoading={isLoading}
          listeSolution={alternanceList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapAlternanceToLienSolution}
        />
      </main>
    </>
  );
}

function mapAlternanceToLienSolution(alternance: Alternance): LienSolution {
  return {
    descriptionOffre: alternance.description,
    id: alternance.id,
    intituléOffre: alternance.intitulé,
    lienOffre: `/apprentissage/${alternance.from}-${alternance.id}`,
    logoEntreprise: alternance.entreprise?.logo || LOGO_ALTERNANCE,
    nomEntreprise: alternance.entreprise?.nom,
    étiquetteOffreList: alternance.étiquetteList,
  };
}

function BannièreAlternance() {
  return (
    <Hero image="/images/banners/offre-alternance.webp">
      Avec la <b>Bonne Alternance</b>, trouvez <br/>
      l’entreprise qu’il vous faut pour <br/>
      <b>réaliser votre projet d’alternance</b>
    </Hero>
  );
}
