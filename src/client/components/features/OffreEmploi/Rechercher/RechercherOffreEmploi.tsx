import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import {
  ÉtiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/ÉtiquettesFiltreOffreEmploi';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { OnisepPartnerCard } from '~/client/components/features/Partner/OnisepPartnerCard';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import {
  LienSolution,
  RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { OffreService } from '~/client/services/offre/offre.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher un emploi';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const offreQuery = useOffreQuery();
  const offreService = useDependency<OffreService>('offreService');

  const MAX_PAGE = 65;

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [offreEmploiList, setOffreEmploiList] = useState<Offre[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    setIsLoading(true);
    setErreurRecherche(undefined);
    offreService.rechercherOffreEmploi(queryString)
      .then((response) => {
        if (response.instance === 'success') {
          setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setOffreEmploiList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
          setErreurRecherche(response.errorType);
        }
        setIsLoading(false);
      });
  }, [router.query, offreService]);

  const messageRésultatRecherche: string = useMemo(() => {
    const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
    if (nombreRésultats > 1) {
      messageRésultatRechercheSplit.push('offres d\'emplois');
    } else {
      messageRésultatRechercheSplit.push('offre d\'emploi');
    }
    if (offreQuery.motCle) {
      messageRésultatRechercheSplit.push(`pour ${offreQuery.motCle}`);
    }
    return messageRésultatRechercheSplit.join(' ');
  }, [nombreRésultats, offreQuery.motCle]);

  return (
    <>
      <HeadTag
        title={title}
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          bannière={<BannièreOffreEmploi/>}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={<ÉtiquettesFiltreOffreEmploi/>}
          formulaireRecherche={<FormulaireRechercheOffreEmploi/>}
          isLoading={isLoading}
          listeSolution={offreEmploiList}
          ariaLabelListeSolution="Offres d'emplois"
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapOffreEmploiToLienSolution}
          paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
          maxPage={MAX_PAGE}
        />
        <EnTeteSection heading="Découvrez des services faits pour vous"/>
        {PartnerCardList([
          LaBonneBoitePartner().props,
          OnisepPartnerCard().props,
          ServiceCiviquePartner().props,
        ])}
      </main>
    </>
  );
}

function mapOffreEmploiToLienSolution(offreEmploi: Offre): LienSolution {
  return {
    id: offreEmploi.id,
    intituléOffre: offreEmploi.intitulé,
    lienOffre: `/emplois/${offreEmploi.id}`,
    logoEntreprise: offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI,
    nomEntreprise: offreEmploi.entreprise.nom,
    étiquetteOffreList: offreEmploi.étiquetteList,
  };
}

function BannièreOffreEmploi() {
  return (
    <LightHero primaryText="Des milliers d'offres d'emplois" secondaryText="sélectionnées pour vous par Pôle Emploi" />
  );
}
