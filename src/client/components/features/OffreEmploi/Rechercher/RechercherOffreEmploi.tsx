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
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE, OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

const PREFIX_TITRE_PAGE = 'Rechercher un emploi';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const offreEmploiQuery = useOffreEmploiQuery();
  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');

  const MAX_PAGE = 65;

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    setIsLoading(true);
    setErreurRecherche(undefined);
    offreEmploiService.rechercherOffreEmploi(queryString)
      .then((response) => {
        if (response.instance === 'success') {
          setTitle(getRechercherOffreHeadTagTitre(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setOffreEmploiList(response.result.résultats);
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
      messageRésultatRechercheSplit.push('offres d\'emplois');
    } else {
      messageRésultatRechercheSplit.push('offre d\'emploi');
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
          paginationOffset={NOMBRE_RÉSULTATS_OFFRE_EMPLOI_PAR_PAGE}
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

function mapOffreEmploiToLienSolution(offreEmploi: OffreEmploi): LienSolution {
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

function BannièreOffreEmploi() {
  return (
    <LightHero primaryText="Des milliers d'offres d'emplois" secondaryText="sélectionnées pour vous par Pôle Emploi" />
  );
}
