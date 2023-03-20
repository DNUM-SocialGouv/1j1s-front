import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest } from 'next';

import { ConsulterFormation } from '~/client/components/features/Formation/Consulter/ConsulterFormation';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import { formationQuerySchema } from '~/pages/api/formations/[id].controller';
import { formationFiltreMapper } from '~/pages/api/formations/index.controller';
import analytics from '~/pages/formations/apprentissage/[id].analytics';
import { isFailure } from '~/server/errors/either';
import { Formation, FormationFiltre } from '~/server/formations/domain/formation';
import { Statistique } from '~/server/formations/domain/statistique';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { dependencies } from '~/server/start';

interface ConsulterFormationPageProps {
	formation: Formation
	statistiques?: Statistique
}

export default function ConsulterFormationPage(props: ConsulterFormationPageProps) {
	useAnalytics(analytics);

	const { formation, statistiques } = props;
	return (
		<>
			<Head
				title={`${formation.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterFormation formation={formation} statistiques={statistiques} />
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterFormationPageProps>> {
	const isFormationActive = process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1';
	if (!isFormationActive) {
		return { notFound: true };
	}

	if (formationQuerySchema.validate(context.query).error) {
		return { notFound: true };
	}

	const id = context.params?.id as string;
	const filtre: FormationFiltre = formationFiltreMapper({ query: context.query } as NextApiRequest);
	const formation = await dependencies.formationDependencies.consulterFormation.handle(id, filtre);

	if (isFailure(formation)) {
		return { notFound: true };
	}

	const codeCertification = context.query.codeCertification as string | undefined;

	if (!codeCertification || !formation.result.adresse.codePostal) {
		return {
			props: {
				formation: removeUndefinedKeys(formation.result),
			},
		};
	}
	const statistiques = await dependencies.formationDependencies.consulterStatistiqueFormation.handle(codeCertification, formation.result.adresse.codePostal);
	if (isFailure(statistiques)) {
		return {
			props: {
				formation: removeUndefinedKeys(formation.result),
			},
		};
	}

	return {
		props: {
			formation: removeUndefinedKeys(formation.result),
			statistiques: removeUndefinedKeys(statistiques.result),
		},
	};
}
