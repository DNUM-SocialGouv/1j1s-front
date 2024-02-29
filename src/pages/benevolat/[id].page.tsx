import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import {
	ConsulterMissionEngagement,
} from '~/client/components/features/Engagement/Consulter/ConsulterMissionEngagement';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/benevolat/[id].analytics';
import { Mission, MissionId } from '~/server/engagement/domain/engagement';
import { GetServerSidePropsResult, setErrorResult } from '~/server/exceptions/getServerSidePropsResultWithError';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterMissionEngagementPageProps {
  missionEngagement: Mission;
}

export default function ConsulterMissionEngagementPage({ missionEngagement }: ConsulterMissionEngagementPageProps) {
	useAnalytics(analytics);

	if (!missionEngagement) return null;

	return (
		<>
			<Head
				title={`${missionEngagement.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterMissionEngagement missionEngagement={ missionEngagement } />
		</>
	);
}

interface MissionContext extends ParsedUrlQuery {
  id: MissionId;
}

export async function getServerSideProps(context: GetServerSidePropsContext<MissionContext>): Promise<GetServerSidePropsResult<ConsulterMissionEngagementPageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const missionEngagement = await dependencies.engagementDependencies.consulterMissionEngagement.handle(id);

	if (missionEngagement.instance === 'failure') {
		return setErrorResult(context, missionEngagement.errorType);
	}

	return {
		props: {
			missionEngagement: JSON.parse(JSON.stringify(missionEngagement.result)),
		},
	};
}
