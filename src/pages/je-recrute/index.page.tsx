import { JeRecrute } from '~/client/components/features/JeRecrute/JeRecrute';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function JeRecrutePage () {
	useAnalytics('je-recrute');

	return (
		<JeRecrute />
	);
}
