import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { TypeEngagement } from '~/client/utils/engagementsCategory.enum';

export default function RechercherMissionBénévolatPage() {
  return <RechercherMission category={TypeEngagement.BENEVOLAT}/>;
}
