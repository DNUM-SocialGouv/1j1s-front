import React, { useState } from 'react';

import {
	FormulaireCandidaterStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/Formulaire/FormulaireCandidaterStage3eEt2de';
import {
	EchecEnvoyerCandidatureStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/ResultatEnvoyerCandidature/EchecEnvoyerCandidatureStage3eEt2de';
import {
	SuccesEnvoyerCandidatureStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/ResultatEnvoyerCandidature/SuccesEnvoyerCandidatureStage3eEt2de';
import { Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';

export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		siret,
		modeDeContact,
		appellations,
	} = props.donneesEntreprise;

	const [etatSoumission, setEtatSoumission] =
		useState<'initial' | 'succes' | 'echec'>('initial');

	return <>
		{etatSoumission === 'initial' && <FormulaireCandidaterStage3eEt2de
			nomEntreprise={nomEntreprise}
			metiersStage3eEt2de={appellations}
			siret={siret}
			modeDeContact={modeDeContact}
			onSuccess={() => setEtatSoumission('succes')}
			onFailure={() => setEtatSoumission('echec')}
		/>}

		<div role={'status'}>
			{etatSoumission === 'succes' && <SuccesEnvoyerCandidatureStage3eEt2de />}
		</div>

		<div role={'alert'}>
			{etatSoumission === 'echec' && <EchecEnvoyerCandidatureStage3eEt2de retourFormulaire={() => setEtatSoumission('initial')} />}
		</div>
	</>;
}
