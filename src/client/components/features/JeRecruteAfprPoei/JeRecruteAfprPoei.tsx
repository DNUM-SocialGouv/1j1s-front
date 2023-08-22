import Avantages from '~/client/components/features/JeRecruteAfprPoei/Avantages/Avantages';
import { CommentCaMarche } from '~/client/components/features/JeRecruteAfprPoei/CommentCaMarche/CommentCaMarche';
import styles from '~/client/components/features/JeRecruteAfprPoei/JeRecruteAfprPoei.module.scss';
import RecrutementCandidatPoleEmploi from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatPoleEmploi/RecrutementCandidatPoleEmploi';
import BanniereRejoindreLaMobilisation
	from '~/client/components/ui/Baniere/BanniereRejoindreLaMobilisation/BanniereRejoindreLaMobilisation';

export default function JeRecruteAfprPoei() {
	return <div className={styles.jeRecruteAfprPoei}>
		<RecrutementCandidatPoleEmploi/>
		<Avantages/>
		<CommentCaMarche/>
		<BanniereRejoindreLaMobilisation/>
	</div>;
}
