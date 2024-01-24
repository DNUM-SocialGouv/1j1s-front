import React, { useState } from 'react';

import {
	EchecEnvoyerCandidatureStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/EchecEnvoyerCandidatureStage3eEt2de';
import {
	FormulaireCandidaterStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/FormulaireCandidaterStage3eEt2de';
import {
	SuccesEnvoyerCandidatureStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/SuccesEnvoyerCandidatureStage3eEt2de';
import { DonneesEntreprise, Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		siret,
		modeDeContact,
		appellations,
	} = props.donneesEntreprise;

	const [etatSoumission, setEtatSoumission] =
		useState<'initial' | 'succes' | 'echec'>('initial');

	if (etatSoumission === 'initial') {
		return <FormulaireCandidaterStage3eEt2de
			nomEntreprise={nomEntreprise}
			metiersStage3eEt2de={appellations}
			siret={siret}
			modeDeContact={modeDeContact}
			onSuccess={() => setEtatSoumission('succes')}
			onFailure={() => setEtatSoumission('echec')}
		/>;
	}

	if (etatSoumission === 'succes') {
		return <SuccesEnvoyerCandidatureStage3eEt2de />;
	}

	return <EchecEnvoyerCandidatureStage3eEt2de retourFormulaire={() => setEtatSoumission('initial')} />;
}

export function aStage3eEt2deCandidaterPageProps(override?: Partial<Stage3eEt2deCandidaterPageProps>): Stage3eEt2deCandidaterPageProps {
	return {
		donneesEntreprise: {
			appellations: [
				{
					code: 'code',
					label: 'label',
				},
			],
			modeDeContact: ModeDeContact.IN_PERSON,
			nomEntreprise: 'nomEntreprise',
			siret: 'siret',
		},
		...override,
	};
}

export function aDonneesEntrepriseStage3eEt2de(override?: Partial<DonneesEntreprise>): DonneesEntreprise {
	return {
		appellations: [
			{
				code: 'code',
				label: 'label',
			},
		],
		modeDeContact: ModeDeContact.IN_PERSON,
		nomEntreprise: 'nomEntreprise',
		siret: 'siret',
		...override,
	};
}
