import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useAnalytics from '~/client/hooks/useAnalytics';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import analytics from '~/pages/benevolat/index.analytics';

export default function RechercherMissionBénévolatPage() {
	useAnalytics(analytics);

	return <RechercherMission category={EngagementCategory.BENEVOLAT}/>;
}
