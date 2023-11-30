import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useAnalytics from '~/client/hooks/useAnalytics';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import analytics from '~/pages/service-civique/index.analytics';

export default function RechercherMissionServiceCiviquePage() {
	useAnalytics(analytics);

	return <RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>;
}

export function getServerSideProps() {
	return {
		props: {},
	};
}
