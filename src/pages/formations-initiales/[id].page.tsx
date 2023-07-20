import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import {
	ConsulterDetailFormationInitiale,
} from '~/client/components/features/FormationInitiale/ConsulterDetail/ConsulterDetailFormationInitiale';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/formations-initiales/[id].analytics';
import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

type ConsulterDetailFormationInitialePageProps = {
	formationInitialeDetail: FormationInitialeDetailComplete;
}

export type FormationInitialeDetailComplete =  FormationInitialeDetail & FormationInitialeDetailCMS;

export async function getServerSideProps(context: GetServerSidePropsContext<{
	id: string
}>): Promise<GetServerSidePropsResult<ConsulterDetailFormationInitialePageProps>> {
	const isFormationsInitalesActive = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	if (!isFormationsInitalesActive) {
		return {
			notFound: true,
		};
	}

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const formationInitialeDetail = await dependencies.formationInitialeDependencies.consulterDetailFormationInitiale.handle(id.toUpperCase());
	const formationInitialeDetailCMS = await dependencies.cmsDependencies.consulterDetailFormationInitiale.handle(id.toUpperCase());

	if (formationInitialeDetail.instance === 'failure') {
		return { notFound: true };
	}

	const formationInitialeDetailCMSResult = formationInitialeDetailCMS.instance === 'failure' ? {} : formationInitialeDetailCMS.result;
	const formationInitialeDetailComplete: FormationInitialeDetailComplete = { ...formationInitialeDetail.result, ...formationInitialeDetailCMSResult };

	return {
		props: {
			formationInitialeDetail: formationInitialeDetailComplete,
		},
	};
}


export default function ConsulterFormationInitialePage({ formationInitialeDetail }: ConsulterDetailFormationInitialePageProps) {
	useAnalytics(analytics);
	useReferrer();
	return (
		<>
			<Head
				title={`${formationInitialeDetail.libelle} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>
		</>
	);
};


