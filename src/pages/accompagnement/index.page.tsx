import React from 'react';

import {
	RechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/accompagnement/index.analytics';

export default function Accompagnement() {
	useAnalytics(analytics);

	return <RechercherAccompagnement />;
}
