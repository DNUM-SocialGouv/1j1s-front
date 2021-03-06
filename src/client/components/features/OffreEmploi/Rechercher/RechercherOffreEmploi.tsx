import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import {
  Ã‰tiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/Ã‰tiquettesFiltreOffreEmploi';
import styles from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi.module.css';
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
import { ErrorType } from '~/server/errors/error.types';
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
  const [nombreRÃ©sultats, setNombreRÃ©sultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErrorType | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
      offreEmploiService.rechercherOffreEmploi(queryString)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(getRechercherOffreHeadTagTitre(`${PREFIX_TITRE_PAGE}${response.result.nombreRÃ©sultats === 0 ? ' - Aucun rÃ©sultat' : ''}`));
            setOffreEmploiList(response.result.rÃ©sultats);
            setNombreRÃ©sultats(response.result.nombreRÃ©sultats);
          } else {
            setTitle(getRechercherOffreHeadTagTitre(PREFIX_TITRE_PAGE, response.errorType));
            setErreurRecherche(response.errorType);
          }
          setIsLoading(false);
        });
    }
  }, [router.query, offreEmploiService]);

  const messageRÃ©sultatRecherche: string = useMemo(() => {
    const messageRÃ©sultatRechercheSplit: string[] = [`${nombreRÃ©sultats}`];
    if (nombreRÃ©sultats > 1) {
      messageRÃ©sultatRechercheSplit.push('offres d\'emplois');
    } else {
      messageRÃ©sultatRechercheSplit.push('offre d\'emploi');
    }
    if (offreEmploiQuery.motCle) {
      messageRÃ©sultatRechercheSplit.push(`pour ${offreEmploiQuery.motCle}`);
    }
    return messageRÃ©sultatRechercheSplit.join(' ');
  }, [nombreRÃ©sultats, offreEmploiQuery.motCle]);

  return (
    <>
      <HeadTag
        title={title}
        description="Plus de 400 000 offres d'emplois et d'alternances sÃ©lectionnÃ©es pour vous"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          banniÃ¨re={<BanniÃ¨reOffreEmploi/>}
          erreurRecherche={erreurRecherche}
          Ã©tiquettesRecherche={<Ã‰tiquettesFiltreOffreEmploi/>}
          formulaireRecherche={<FormulaireRechercheOffreEmploi/>}
          isLoading={isLoading}
          listeSolution={offreEmploiList}
          messageRÃ©sultatRecherche={messageRÃ©sultatRecherche}
          nombreSolutions={nombreRÃ©sultats}
          mapToLienSolution={mapOffreEmploiToLienSolution}
          paginationOffset={OFFRE_PER_PAGE}
        />
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
      </main>
    </>
  );
}

function mapOffreEmploiToLienSolution(offreEmploi: OffreEmploi): LienSolution {
  return {
    descriptionOffre: offreEmploi.description,
    id: offreEmploi.id,
    intitulÃ©Offre: offreEmploi.intitulÃ©,
    lienOffre: `/emplois/${offreEmploi.id}`,
    logoEntreprise: offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI,
    nomEntreprise: offreEmploi.entreprise.nom,
    Ã©tiquetteOffreList: offreEmploi.Ã©tiquetteList,
  };
}

function BanniÃ¨reOffreEmploi() {
  return (
    <Hero>
      Des milliers d&apos;<b>offres d&apos;emplois sÃ©lectionnÃ©es pour vous</b> par PÃ´le Emploi
    </Hero>
  );
}
