import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {
  FormulaireRechercheAccompagnement,
} from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement';
import {
  RésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import {PartnerCardList} from '~/client/components/features/Partner/Card/PartnerCard';
import {InfoJeunesCard} from '~/client/components/features/Partner/InfoJeunesCard';
import {MissionsLocalesCard} from '~/client/components/features/Partner/MissionsLocalesCard';
import {PoleEmploiCard} from '~/client/components/features/Partner/PoleEmploiCard';
import {RechercherSolutionLayout} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {EnTeteSection} from '~/client/components/ui/EnTeteSection/EnTeteSection';
import {LightHero} from '~/client/components/ui/Hero/LightHero';
import {TagList} from '~/client/components/ui/Tag/TagList';
import {HeadTag} from '~/client/components/utils/HeaderTag';
import {useDependency} from '~/client/context/dependenciesContainer.context';
import {useAccompagnementQuery} from '~/client/hooks/useAccompagnementQuery';
import {
  ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import {formatRechercherSolutionDocumentTitle} from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import {ErreurMétier} from '~/server/errors/erreurMétier.types';
import {ÉtablissementAccompagnement} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {TypeÉtablissement} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';

export interface LienSolutionAccompagnement {
  id: string
  lienOffre?: string
  intituléOffre: string
  logoEntreprise: string
  nomEntreprise?: string
  étiquetteOffreList: (string | undefined)[]
  horaires?: ÉtablissementAccompagnement.Horaire[]
}

export function RechercherAccompagnement() {
  const accompagnementQuery = useAccompagnementQuery();
  const établissementAccompagnementService = useDependency<ÉtablissementAccompagnementService>('établissementAccompagnementService');

  const [établissementAccompagnementList, setÉtablissementAccompagnementList] = useState<ÉtablissementAccompagnement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState<ErreurMétier | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>();

  const isEachQueryParamPresent = useCallback(() => {
    const { codeCommune, libelleCommune, typeAccompagnement } = accompagnementQuery;
    return codeCommune && libelleCommune && typeAccompagnement;
  }, [accompagnementQuery]);

  useEffect(function rechercherÉtablissementAccompagnement() {
    if (isEachQueryParamPresent()) {
      setIsLoading(true);
      setErreurRecherche(undefined);
      établissementAccompagnementService.rechercher(accompagnementQuery)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(formatRechercherSolutionDocumentTitle(`Rechercher un établissement d‘accompagnement ${response.result.length === 0 ? ' - Aucun résultat' : ''}`));
            setÉtablissementAccompagnementList(response.result);
          } else {
            setTitle(formatRechercherSolutionDocumentTitle('Rechercher un établissement d‘accompagnement', response.errorType));
            setErreurRecherche(response.errorType);
          }
          setIsLoading(false);
        });
    }
    else {
      setErreurRecherche(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }, [accompagnementQuery, isEachQueryParamPresent, établissementAccompagnementService]);

  const messageRésultatRecherche: string = useMemo(() => {
    const messageRésultatRechercheSplit: string[] = [`${établissementAccompagnementList.length}`];
    if (établissementAccompagnementList.length > 1) {
      messageRésultatRechercheSplit.push('établissements');
    } else {
      messageRésultatRechercheSplit.push('établissement');
    }

    switch (accompagnementQuery.typeAccompagnement) {
      case TypeÉtablissement.AGENCE_POLE_EMPLOI:
        messageRésultatRechercheSplit.push('d‘accompagnement pour les Agences Pôle Emploi');
        break;
      case TypeÉtablissement.INFO_JEUNE:
        messageRésultatRechercheSplit.push('d‘accompagnement pour les structures Infos Jeunes');
        break;
      case TypeÉtablissement.MISSION_LOCALE:
        messageRésultatRechercheSplit.push('d‘accompagnement pour les structures Missions Locales');
        break;
    }

    return messageRésultatRechercheSplit.join(' ');
  }, [accompagnementQuery.typeAccompagnement, établissementAccompagnementList.length]);

  return (
    <>
      <HeadTag
        title={title || 'Trouver un accompagnement | 1jeune1solution'}
        description="Trouver un accompagnement"
      />
      <main id="contenu">
        <RechercherSolutionLayout
          bannière={<BannièreAccompagnement/>}
          erreurRecherche={erreurRecherche}
          étiquettesRecherche={accompagnementQuery.libelleCommune ? <TagList list={[accompagnementQuery.libelleCommune]} aria-label="Filtres de la recherche"/> : null}
          formulaireRecherche={<FormulaireRechercheAccompagnement/>}
          isLoading={isLoading}
          listeSolution={établissementAccompagnementList}
          messageRésultatRecherche={messageRésultatRecherche}
          nombreSolutions={établissementAccompagnementList.length}
          mapToLienSolution={mapAccompagnementToLienSolution}
          ariaLabelListeSolution={'Établissements d‘accompagnement'}
          displaySolution={displayAccompagnement}
        />
        <EnTeteSection heading="Découvrez d’autres services faits pour vous"/>
        {PartnerCardList([
          MissionsLocalesCard().props,
          InfoJeunesCard().props,
          PoleEmploiCard().props,
        ])}
      </main>
    </>
  );
}

function mapAccompagnementToLienSolution(établissementAccompagnement: ÉtablissementAccompagnement): LienSolutionAccompagnement {
  return {
    horaires: établissementAccompagnement.horaires,
    id: établissementAccompagnement.id,
    intituléOffre: établissementAccompagnement.nom,
    lienOffre: établissementAccompagnement.email ? `mailto:${établissementAccompagnement.email}` : undefined,
    logoEntreprise: '/images/logos/info-jeunes.svg',
    nomEntreprise: établissementAccompagnement.adresse,
    étiquetteOffreList: [établissementAccompagnement.telephone, établissementAccompagnement.email],
  };
}

function BannièreAccompagnement() {
  return (
    <LightHero primaryText="Je recherche un accompagnement proche de chez moi," secondaryText="je veux être aidé dans mes démarches et mon parcours" />
  );
}

function displayAccompagnement(lienAccompagnement: LienSolutionAccompagnement): React.ReactNode {
  return (
    <li key={lienAccompagnement.id}>
      <RésultatRechercherAccompagnement
        lienOffre={lienAccompagnement.lienOffre}
        intituléOffre={lienAccompagnement.intituléOffre}
        logoEntreprise={lienAccompagnement.logoEntreprise}
        nomEntreprise={lienAccompagnement.nomEntreprise}
        étiquetteOffreList={lienAccompagnement.étiquetteOffreList}
        horaires={lienAccompagnement.horaires}
      />
    </li>
  );
}
