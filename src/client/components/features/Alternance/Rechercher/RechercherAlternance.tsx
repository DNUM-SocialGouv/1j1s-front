import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { OnisepPartnerCard } from '~/client/components/features/Partner/OnisepPartnerCard';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import {
  LienSolution,
  RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher une alternance';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherAlternance() {
  const router = useRouter();
  const offreEmploiQuery = useOffreEmploiQuery();
  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');

  const MAX_PAGE = 65;

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [alternanceList, setAlternanceList] = useState<Offre[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);

    setIsLoading(true);
    setErreurRecherche(undefined);
    offreEmploiService.rechercherAlternance(queryString)
      .then((response) => {
        if (response.instance === 'success') {
          setTitle(getRechercherOffreHeadTagTitre(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setAlternanceList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setTitle(getRechercherOffreHeadTagTitre(PREFIX_TITRE_PAGE, response.errorType));
          setErreurRecherche(response.errorType);
        }
        setIsLoading(false);
      });
  }, [router.query, offreEmploiService]);

  const messageRésultatRecherche: string = useMemo(() => {
    const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
    if (nombreRésultats > 1) {
      messageRésultatRechercheSplit.push('offres d’alternances');
    } else {
      messageRésultatRechercheSplit.push('offre d’alternance');
    }
    if (offreEmploiQuery.motCle) {
      messageRésultatRechercheSplit.push(`pour ${offreEmploiQuery.motCle}`);
    }
    return messageRésultatRechercheSplit.join(' ');
  }, [nombreRésultats, offreEmploiQuery.motCle]);

  return (
    <>
      <HeadTag
        title={title}
        description="Des milliers d’alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          bannière={<BannièreAlternance/>}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={offreEmploiQuery.libelleLocalisation ? <TagList list={[offreEmploiQuery.libelleLocalisation]} aria-label="Filtres de la recherche" /> : null}
          formulaireRecherche={<FormulaireRechercheAlternance />}
          isLoading={isLoading}
          listeSolution={alternanceList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapAlternanceToLienSolution}
          paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
          maxPage={MAX_PAGE}
        />
        {PartnerCardList([
          LaBonneBoitePartner().props,
          OnisepPartnerCard().props,
          ServiceCiviquePartner().props,
        ])}
      </main>
    </>
  );
}

function mapAlternanceToLienSolution(offreEmploi: Offre): LienSolution {
  return {
    descriptionOffre: offreEmploi.description,
    id: offreEmploi.id,
    intituléOffre: offreEmploi.intitulé,
    lienOffre: `/emplois/${offreEmploi.id}`,
    logoEntreprise: offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI,
    nomEntreprise: offreEmploi.entreprise.nom,
    étiquetteOffreList: offreEmploi.étiquetteList,
  };
}

function BannièreAlternance() {
  return (
    <LightHero primaryText="Des milliers d’alternances" secondaryText="sélectionnés pour vous par Pôle Emploi" />
  );
}
