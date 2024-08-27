import Avantages from '~/client/components/features/JeRecruteAfprPoei/Avantages/Avantages';
import { CommentCaMarche } from '~/client/components/features/JeRecruteAfprPoei/CommentCaMarche/CommentCaMarche';
import styles from '~/client/components/features/JeRecruteAfprPoei/JeRecruteAfprPoei.module.scss';
import RecrutementCandidatFranceTravail from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatFranceTravail/RecrutementCandidatFranceTravail';
import BanniereRejoindreLaMobilisation
	from '~/client/components/ui/Baniere/BanniereRejoindreLaMobilisation/BanniereRejoindreLaMobilisation';

export default function JeRecruteAfprPoei() {
	return (
		<div className={styles.jeRecruteAfprPoei}>
			<RecrutementCandidatFranceTravail/>
			<Avantages/>
			<CommentCaMarche/>
			<BanniereRejoindreLaMobilisation/>
		</div>
	);
}
