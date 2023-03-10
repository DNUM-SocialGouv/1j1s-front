import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionBénévolatPage() {
	useAnalytics('benevolat');
	useReferrer();
  
	return <RechercherMission category={EngagementCategory.BENEVOLAT}/>;
}
