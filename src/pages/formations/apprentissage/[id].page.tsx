import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { ConsulterFormation } from '~/client/components/features/Formation/Consulter/ConsulterFormation';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
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

	const formationQuerySchema = Joi.object({
		codeCertification: Joi.string(),
		codeCommune: Joi.string().required(),
		codeRomes: Joi.string().required(),
		distanceCommune: Joi.string().required(),
		id: Joi.string().required(),
		latitudeCommune: Joi.string().required(),
		longitudeCommune: Joi.string().required(),
		niveauEtudes: Joi.string().optional(),
	});

	if (formationQuerySchema.validate(context.query).error) {
		return { notFound: true };
	}

	const id = context.params?.id as string;
	const filtre: FormationFiltre.AvecCodeCertification = {
		codeCertification: context.query.codeCertification ? String(context.query.codeCertification) : '',
		codeCommune: String(context.query.codeCommune),
		codeRomes: context.query.codeRomes ? queryToArray(context.query.codeRomes) : [],
		distanceCommune: String(context.query.distanceCommune),
		latitudeCommune: String(context.query.latitudeCommune),
		longitudeCommune: String(context.query.longitudeCommune),
	};

	const { formation, statistiques } = await dependencies.formationDependencies.consulterFormation.handle(id, filtre);

	if (isFailure(formation)) {
		return { notFound: true };
	}

	if (!statistiques || isFailure(statistiques)) {
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
