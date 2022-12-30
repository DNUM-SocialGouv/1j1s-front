import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useReferrer from '~/client/hooks/useReferrer';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionBénévolatPage() {
	useReferrer();
  
	return <RechercherMission category={EngagementCategory.BENEVOLAT}/>;
}
