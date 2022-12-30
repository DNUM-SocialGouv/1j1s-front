import { useMemo } from 'react';
import {
	TypeÉtablissement,
} from 'src/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

export function useAccompagnementLogo(typeÉtablissement: TypeÉtablissement) {
	return useMemo(() => {
		switch (typeÉtablissement) {
			case 'cij':
				return '/images/logos/info-jeunes.svg';
			case 'mission_locale':
				return '/images/logos/union-mission-locale.svg';
			case 'pole_emploi':
				return '/images/logos/pole-emploi.svg';
			default:
				return '';
		}
	}, [typeÉtablissement]);
}
