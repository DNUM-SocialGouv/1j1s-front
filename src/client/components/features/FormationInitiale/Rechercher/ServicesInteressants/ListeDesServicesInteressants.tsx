import React from 'react';

import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { FormationsEnApprentissageCard } from '~/client/components/features/ServiceCard/FormationsEnApprentissageCard';
import { MonCompteFormationPartner } from '~/client/components/features/ServiceCard/MonCompteFormationPartner';
import { OnisepMetierPartner } from '~/client/components/features/ServiceCard/OnisepMetierPartner';
import { ParcourSupPartner } from '~/client/components/features/ServiceCard/ParcourSupPartner';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';

export function ListeDesServicesInteressants() {
	return <>
		<EnTete heading='Des services faits pour vous' headingLevel={'h2'}/>
		<ServiceCardList>
			<OnisepMetierPartner/>
			<FormationsEnApprentissageCard/>
			<ParcourSupPartner/>
			<MonCompteFormationPartner/>
		</ServiceCardList>
	</>;;
}
