import { GetServerSidePropsResult } from 'next';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/formations-initiales/index.analytics';
import {
	FormulaireRechercheFormationInitiale
} from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RechercherFormationInitiale
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';

export default function FormationsInitialesPage() {
	useAnalytics(analytics);
	useReferrer();
	return (
		<RechercherFormationInitiale/>
	);
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFormationsInitalesActive = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	if (!isFormationsInitalesActive) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
