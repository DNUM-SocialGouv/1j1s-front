import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import useReferrer from '~/client/hooks/useReferrer';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionServiceCiviquePage() {
  useReferrer();
  
  return <RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>;
}
