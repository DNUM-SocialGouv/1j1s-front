import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionBĂ©nĂ©volatPage() {
  return <RechercherMission category={EngagementCategory.BENEVOLAT}/>;
}
