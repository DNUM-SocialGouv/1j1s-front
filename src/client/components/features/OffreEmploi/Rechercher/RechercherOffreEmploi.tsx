import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import {
  ÉtiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/ÉtiquettesFiltreOffreEmploi';
import styles from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi.module.scss';
import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import {
  LienSolution,
  RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

const PREFIX_TITRE_PAGE = 'Rechercher un emploi';
const OFFRE_PER_PAGE = 30;
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const offreEmploiQuery = useOffreEmploiQuery();
  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
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
    }
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
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapOffreEmploiToLienSolution}
          paginationOffset={OFFRE_PER_PAGE}
        />
        <div className={styles.partnerListWrapper}>
          <ul className={styles.partnerList}>
            <li>
              <ServiceCiviquePartner/>
            </li>
            <li>
              <LaBonneBoitePartner/>
            </li>
            <li>
              <CIDJPartner/>
            </li>
          </ul>
        </div>
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
    <Hero>
      Des milliers d&apos;<b>offres d&apos;emplois sélectionnées pour vous</b> par Pôle Emploi
    </Hero>
  );
}
