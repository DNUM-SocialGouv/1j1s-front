import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheMissionEngagement,
} from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement';
import styles from '~/client/components/features/RechercherOffre.module.css';
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
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { bénévolatDomaineList, Mission, serviceCiviqueDomaineList } from '~/server/engagement/domain/engagement';
import { ErrorType } from '~/server/errors/error.types';

interface RechercherMissionProps {
  category: 'bénévolat' | 'service-civique'
}

export function RechercherMission(props: RechercherMissionProps) {
  const { category } = props;
  const missionEngagementService = useDependency<MissionEngagementService>('missionEngagementService');
  const { domain } = useMissionEngagementQuery();
  const router = useRouter();
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const isServiceCivique = useMemo(() => {
    return category === 'service-civique';
  }, [category]);

  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErrorType | undefined>(undefined);
  const [title, setTitle] = useState<string>(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution'`);

  const OFFRE_PER_PAGE = 30;

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
      missionEngagementService
        .rechercherMission(queryString, category)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de  ${isServiceCivique ? 'service civique' : 'bénévolat'} ${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
            setMissionList(response.result.résultats);
            setNombreRésultats(response.result.nombreRésultats);
          } else {
            setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'}`, response.errorType));
            setErreurRecherche(response.errorType);
          }
          setIsLoading(false);
        });
    }
  }, [router.query, missionEngagementService, category, isServiceCivique]);

  const messageRésultatRecherche = useMemo(() => {
    if (domain) {
      return `${nombreRésultats} de missions pour ${récupérerLibelléDepuisValeur(isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList, domain)}`;
    } else {
      return `${nombreRésultats} de missions`;
    }
  }, [domain, isServiceCivique, nombreRésultats]);

  return (
    <>
      <HeadTag
        title={title || `Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution`}
        description="Se rendre utile tout en préparant son avenir grâce aux missions de service civique"
      />
      <main id="contenu" className={styles.container}>
        <RechercherSolutionLayout
          bannière={<BannièreMission isServiceCivique={isServiceCivique} />}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={<ÉtiquettesRechercherSolution/>}
          formulaireRecherche={<FormulaireRechercheMissionEngagement domainList={isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList}/>}
          isLoading={isLoading}
          listeSolution={missionList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={isServiceCivique ? mapMissionServiceCiviqueToLienSolution: mapMissionBénévolatToLienSolution}
          paginationOffset={OFFRE_PER_PAGE}
        />
      </main>
    </>
  );
}

function mapMissionBénévolatToLienSolution(mission: Mission): LienSolution {
  return {
    descriptionOffre: mission.description,
    id: mission.id,
    intituléOffre: mission.titre,
    lienOffre: `/benevolat/${mission.id}`,
    logoEntreprise: '/images/logos/je-veux-aider.svg',
    nomEntreprise: mission.nomEntreprise,
    étiquetteOffreList: mission.étiquetteList,
  };
}

function mapMissionServiceCiviqueToLienSolution(mission: Mission): LienSolution {
  return {
    descriptionOffre: mission.description,
    id: mission.id,
    intituléOffre: mission.titre,
    lienOffre: `/service-civique/${mission.id}`,
    logoEntreprise: '/images/logos/service-civique.svg',
    nomEntreprise: mission.nomEntreprise,
    étiquetteOffreList: mission.étiquetteList,
  };
}

interface BannièreMissionProps {
  isServiceCivique: boolean
}

function BannièreMission({ isServiceCivique }: BannièreMissionProps) {
  return (
    <Hero image="/images/banners/mission-service-civique.webp">
      <b>Se rendre utile</b> tout en <b>préparant</b><br/>
      <b>son avenir</b> grâce aux missions de<br/>
      <b>{isServiceCivique ? 'Service Civique' : 'Bénévolat'}</b>
    </Hero>
  );
}
