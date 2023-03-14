import React from 'react';

import JeDeviensMentor from '~/client/components/features/JeDeviensMentor/JeDeviensMentor';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/je-deviens-mentor/index.analytics';

export default function JeDeviensMentorPage() {
	useAnalytics(analytics);

	return (
		<JeDeviensMentor />
	);
}
