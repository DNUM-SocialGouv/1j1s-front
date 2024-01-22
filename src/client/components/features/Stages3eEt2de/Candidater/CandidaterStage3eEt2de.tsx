import React from 'react';

import {
	FormulaireCandidaterStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/FormulaireCandidaterStage3eEt2de';
import {
	SuccesEnvoyerCandidatureStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/SuccesEnvoyerCandidatureStage3eEt2de';
import { Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';

export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		siret,
		modeDeContact,
		appellations,
	} = props;

	const [etatSoumission, setEtatSoumission] =
		React.useState<'initial' | 'succes' | 'echec'>('initial');

	if (etatSoumission === 'initial') {
		return <FormulaireCandidaterStage3eEt2de
			nomEntreprise={nomEntreprise}
			metiersStage3eEt2de={appellations}
			siret={siret}
			modeDeContact={modeDeContact}
			appellations={appellations}
			onSuccess={() => setEtatSoumission('succes')}
			onFailure={() => setEtatSoumission('echec')}
		/>;
	}

	if (etatSoumission === 'succes') {
		return <SuccesEnvoyerCandidatureStage3eEt2de />;
	}

	return null;
}
