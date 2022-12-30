import React, { useCallback, useState } from 'react';

import {
	ModalDemandeDeContactAccompagnement,
} from '~/client/components/features/Accompagnement/DemandeDeContact/ModalDemandeDeContactAccompagnement';
import {
	RésultatRechercherAccompagnementDesktop,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementDesktop';
import {
	RésultatRechercherAccompagnementMobile,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementMobile';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import {
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

export interface RésultatRechercherAccompagnementProps {
  établissement: ÉtablissementAccompagnement
}

export function RésultatRechercherAccompagnement({ établissement }: RésultatRechercherAccompagnementProps) {
	const { isLargeScreen } = useBreakpoint();

	const isMissionLocale = établissement.type === TypeÉtablissement.MISSION_LOCALE;
	const [isPopInOpen, setIsPopInOpen] = useState(false);
  
	const openContactÉtablissementModal = useCallback(() => {
		setIsPopInOpen(true);
	}, []);

	return (
		<>
			{
				isLargeScreen ?
					<RésultatRechercherAccompagnementDesktop
						établissement={établissement}
						onContactClick={openContactÉtablissementModal}
					/>
					:
					<RésultatRechercherAccompagnementMobile
						établissement={établissement}
						onContactClick={openContactÉtablissementModal}
					/>
			}
			{
				isMissionLocale && établissement.email &&
        <ModalDemandeDeContactAccompagnement
        	contactÉtablissementAccompagnement={{
        		email: établissement.email,
        		nom: établissement.nom,
        		type: établissement.type,
        	}}
        	isOpen={isPopInOpen}
        	setIsOpen={setIsPopInOpen}
        />
			}
		</>
	);
}
