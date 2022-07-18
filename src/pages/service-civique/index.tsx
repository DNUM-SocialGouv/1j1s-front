import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { TypeEngagement } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionServiceCiviquePage() {
  return <RechercherMission category={TypeEngagement.SERVICE_CIVIQUE}/>;
}
