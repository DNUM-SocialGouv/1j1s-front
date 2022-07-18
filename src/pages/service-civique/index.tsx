import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionServiceCiviquePage() {
  return <RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>;
}
