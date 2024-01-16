import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import empty from '~/client/utils/empty';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { dependencies } from '~/server/start';

interface Stage3eEt2deCandidaterPageProps {
	nomEntreprise: string;
	appellations: Array<{
		code: string;
		label: string;
	}>
	siret: string;
	modeDeContact: ModeDeContact;
}

export default function Stages3eEt2deCandidaterPage() {
	// useAnalytics(analytics);


}

const stage3eEt2deCandidaterQuerySchema = Joi.object({
	appellationCodes: Joi.string().required(),
	modeDeContact: Joi.string().required(),
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
	if (appellations.instance === 'failure') {
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
