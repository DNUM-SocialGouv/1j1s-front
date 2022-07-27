import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
import styles from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi.module.css';
import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import {
  LienSolution,
  RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErrorType } from '~/server/errors/error.types';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

const PREFIX_TITRE_PAGE = 'Rechercher un job étudiant';
const OFFRE_PER_PAGE = 30;
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherJobÉtudiant() {
  const router = useRouter();
  const offreEmploiQuery = useOffreEmploiQuery();
  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [jobÉtudiantList, setJobÉtudiantList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErrorType | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
      setErreurRecherche(undefined);
      offreEmploiService.rechercherJobÉtudiant(queryString)
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
    }
  }, [router.query, offreEmploiService]);

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
          étiquettesRecherche={<TagList list={[offreEmploiQuery.libelleLocalisation]} aria-label="Filtres de la recherche" />}
          formulaireRecherche={<FormulaireRechercheJobÉtudiant/>}
          isLoading={isLoading}
          listeSolution={jobÉtudiantList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={nombreRésultats}
          mapToLienSolution={mapJobÉtudiantToLienSolution}
          paginationOffset={OFFRE_PER_PAGE}
        />
        <ul className={styles.partnerList}>
          <li>
            <CIDJPartner/>
          </li>
          <li>
            <LaBonneBoitePartner/>
          </li>
          <li>
            <ServiceCiviquePartner/>
          </li>
        </ul>
      </main>
    </>
  );
}

function mapJobÉtudiantToLienSolution(offreEmploi: OffreEmploi): LienSolution {
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
    <Hero>
      Des milliers de <b>jobs étudiants sélectionnés pour vous</b> par Pôle Emploi
    </Hero>
  );
}
