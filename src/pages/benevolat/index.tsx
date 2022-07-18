import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionBénévolatPage() {
  return <RechercherMission category={EngagementCategory.BENEVOLAT}/>;
}
