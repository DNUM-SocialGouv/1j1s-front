import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheAccompagnement,
} from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement';
import {
	RésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnement';
import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { InfoJeunesPartner } from '~/client/components/features/ServiceCard/InfoJeunesPartner';
import { MissionsLocalesPartner } from '~/client/components/features/ServiceCard/MissionsLocalesPartner';
import { PoleEmploiPartner } from '~/client/components/features/ServiceCard/PoleEmploiPartner';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useAccompagnementQuery } from '~/client/hooks/useAccompagnementQuery';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	EtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

export function RechercherAccompagnement() {
	const accompagnementQuery = useAccompagnementQuery();
	const établissementAccompagnementService = useDependency<ÉtablissementAccompagnementService>('établissementAccompagnementService');

	const [établissementAccompagnementList, setÉtablissementAccompagnementList] = useState<EtablissementAccompagnement[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
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
		} else {
			setErreurRecherche(ErreurMetier.DEMANDE_INCORRECTE);
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
			case TypeÉtablissement.FRANCE_TRAVAIL:
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

	const étiquettesRecherche = useMemo(() => {
		if (accompagnementQuery.libelleCommune) {
			return <TagList list={[accompagnementQuery.libelleCommune]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [accompagnementQuery.libelleCommune]);

	return (
		<>
			<Head
				title={title || 'Trouver un accompagnement | 1jeune1solution'}
				description="Trouver un accompagnement"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BannièreAccompagnement/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={étiquettesRecherche}
					formulaireRecherche={<FormulaireRechercheAccompagnement/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageRésultatRecherche}
					nombreSolutions={établissementAccompagnementList.length}
					listeSolutionElement={<ListeÉtablissementAccompagnement résultatList={établissementAccompagnementList}/>}
				/>
				<EnTete heading="Découvrez d’autres services faits pour vous"/>
				<ServiceCardList>
					<MissionsLocalesPartner />
					<InfoJeunesPartner />
					<PoleEmploiPartner />
				</ServiceCardList>
			</main>
		</>
	);
}

function BannièreAccompagnement() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>
					Je recherche un accompagnement proche de chez moi
				</LightHeroPrimaryText>
			</h1>
			<LightHeroSecondaryText>je veux être aidé dans mes démarches et mon parcours</LightHeroSecondaryText>
		</LightHero>
	);
}

interface ListeRésultatProps {
  résultatList: EtablissementAccompagnement[]
}

function ListeÉtablissementAccompagnement({ résultatList }: ListeRésultatProps) {
	if (!résultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Établissements d‘accompagnement">
			{résultatList.map((établissementAccompagnement: EtablissementAccompagnement) => (
				<li key={établissementAccompagnement.id}>
					<RésultatRechercherAccompagnement établissement={établissementAccompagnement}/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}


