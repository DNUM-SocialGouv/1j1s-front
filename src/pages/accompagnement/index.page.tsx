import React from 'react';

import {
	RechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function Accompagnement() {
	useAnalytics('accompagnement');

	return <RechercherAccompagnement />;
}
