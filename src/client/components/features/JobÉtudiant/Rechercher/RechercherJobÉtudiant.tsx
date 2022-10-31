import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
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
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { OffreService } from '~/client/services/offre/offreService';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher un job étudiant';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherJobÉtudiant() {
  const router = useRouter();
  const offreEmploiQuery = useOffreQuery();
  const offreService = useDependency<OffreService>('offreService');

  const MAX_PAGE = 65;

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [jobÉtudiantList, setJobÉtudiantList] = useState<Offre[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);

    setIsLoading(true);
    setErreurRecherche(undefined);
    offreService.rechercherJobÉtudiant(queryString)
      .then((response) => {
        if (response.instance === 'success') {
          setTitle(getRechercherOffreHeadTagTitre(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setJobÉtudiantList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setTitle(getRechercherOffreHeadTagTitre(PREFIX_TITRE_PAGE, response.errorType));
          setErreurRecherche(response.errorType);
        }
        setIsLoading(false);
      });
  }, [router.query, offreService]);

  const messageRésultatRecherche: string = useMemo(() => {
    const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
    if (nombreRésultats > 1) {
      messageRésultatRechercheSplit.push('offres de jobs étudiants');
    } else {
      messageRésultatRechercheSplit.push('offre de job étudiant');
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
        description="Des milliers de jobs étudiants sélectionnés pour vous"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          bannière={<BannièreJobÉtudiant/>}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={offreEmploiQuery.libelleLocalisation ? <TagList list={[offreEmploiQuery.libelleLocalisation]} aria-label="Filtres de la recherche" /> : null}
          formulaireRecherche={<FormulaireRechercheJobÉtudiant/>}
          isLoading={isLoading}
          listeSolution={jobÉtudiantList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapJobÉtudiantToLienSolution}
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

function mapJobÉtudiantToLienSolution(offreEmploi: Offre): LienSolution {
  return {
    descriptionOffre: offreEmploi.description,
    id: offreEmploi.id,
    intituléOffre: offreEmploi.intitulé,
    lienOffre: `/jobs-etudiants/${offreEmploi.id}`,
    logoEntreprise: offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI,
    nomEntreprise: offreEmploi.entreprise.nom,
    étiquetteOffreList: offreEmploi.étiquetteList,
  };
}

function BannièreJobÉtudiant() {
  return (
    <LightHero primaryText="Des milliers de jobs étudiants" secondaryText="sélectionnés pour vous par Pôle Emploi" />
  );
}
