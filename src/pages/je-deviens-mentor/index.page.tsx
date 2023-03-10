import React from 'react';

import JeDeviensMentor from '~/client/components/features/JeDeviensMentor/JeDeviensMentor';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function JeDeviensMentorPage() {
	useAnalytics('je-deviens-mentor');

	return (
		<JeDeviensMentor />
	);
}
