import Avantages from '~/client/components/features/JeRecruteAfprPoei/Avantages/Avantages';
import styles from '~/client/components/features/JeRecruteAfprPoei/JeRecruteAfprPoei.module.scss';
import RecrutementCandidatPôleEmploi from '~/client/components/features/JeRecruteAfprPoei/RecrutementCandidatPôleEmploi/RecrutementCandidatPôleEmploi';
import BanniereRejoindreLaMobilisation
	from '~/client/components/ui/Baniere/BanniereRejoindreLaMobilisation/BanniereRejoindreLaMobilisation';

export default function JeRecruteAfprPoei() {
	return <div className={styles.jeRecruteAfprPoei}>
		<RecrutementCandidatPôleEmploi/>
		<Avantages/>
		<BanniereRejoindreLaMobilisation/>
	</div>;
}
