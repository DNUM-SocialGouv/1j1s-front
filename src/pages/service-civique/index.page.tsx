import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import analytics from '~/pages/service-civique/index.analytics';

export default function RechercherMissionServiceCiviquePage() {
	useAnalytics(analytics);
	useReferrer();
  
	return <RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>;
}
