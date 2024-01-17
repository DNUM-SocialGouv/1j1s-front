import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import CandidaterStage3eEt2de from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de';
import empty from '~/client/utils/empty';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { dependencies } from '~/server/start';
import { Head } from '~/client/components/head/Head';

export interface Stage3eEt2deCandidaterPageProps {
	nomEntreprise: string;
	appellations: Array<MetierStage3eEt2de>
	siret: string;
	modeDeContact: ModeDeContact;
}

export default function Stages3eEt2deCandidaterPage(props: Stage3eEt2deCandidaterPageProps ) {
	return <>
		<Head
			title={'Candidater à un stage de 3e et 2de | 1jeune1solution'}
			description="Candidater à un stage de 3e et 2de"
			robots="index,follow"
		/>
		<main id="contenu">
			<CandidaterStage3eEt2de {...props} />
		</main>
	</>;
}

const stage3eEt2deCandidaterQuerySchema = Joi.object({
	appellationCodes: Joi.string().required(),
	modeDeContact: Joi.string().valid(...Object.values(ModeDeContact)).required(),
	nomEntreprise: Joi.string().required(),
	siret: Joi.string().required(),
}).options({ allowUnknown: true });

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Stage3eEt2deCandidaterPageProps>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	const { query } = context;

	if (empty(query)) {
		return { notFound: true };
	}

	if (stage3eEt2deCandidaterQuerySchema.validate(query).error) {
		return { notFound: true };
	}

	const appellationCodes = queryToArray(query.appellationCodes!);

	const appellations = await dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle(appellationCodes);

	const isAppellationsInvalid = appellations.instance === 'failure' || appellations.result.length === 0;
	if (isAppellationsInvalid) {
		return { notFound: true }; // TODO : Gestion d'erreur
	}

	const props: Stage3eEt2deCandidaterPageProps = {
		appellations: appellations.result,
		modeDeContact: query.modeDeContact as ModeDeContact,
		nomEntreprise: query.nomEntreprise as string,
		siret: query.siret as string,
	};
	return { props };
}
