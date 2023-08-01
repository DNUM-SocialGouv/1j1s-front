import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import {
	ConsulterDetailFormationInitiale,
} from '~/client/components/features/FormationInitiale/ConsulterDetail/ConsulterDetailFormationInitiale';
import { OnisepGeneralPartner } from '~/client/components/features/ServiceCard/OnisepGeneralPartner';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import { DateService } from '~/client/services/date/date.service';
import analytics from '~/pages/formations-initiales/[id].analytics';
import styles from '~/pages/formations-initiales/[id].module.scss';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import {
	FormationInitialeDetailComplete,
	isFormationWithDetails,
} from '~/server/formations-initiales-detail/domain/formationInitiale';
import { dependencies } from '~/server/start';

type ConsulterDetailFormationInitialePageProps = {
	formationInitialeDetail: FormationInitialeDetailComplete;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{
	id: string
}>): Promise<GetServerSidePropsResult<ConsulterDetailFormationInitialePageProps>> {
	const isFormationsInitalesActive = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	if (!isFormationsInitalesActive) {
		return {
			notFound: true,
		};
	}

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const formationInitialeDetailComplete = await dependencies.formationInitialeDetailDependencies.consulterDetailFormationInitiale.handle(id);

	if (formationInitialeDetailComplete.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			formationInitialeDetail: formationInitialeDetailComplete.result,
		},
	};
}


export default function ConsulterFormationInitialePage({ formationInitialeDetail }: ConsulterDetailFormationInitialePageProps) {
	const dateService = useDependency<DateService>('dateService');

	useAnalytics(analytics);
	useReferrer();

	const dataUpdatedDate = isFormationWithDetails(formationInitialeDetail) ? dateService.formatToFRLongDate(formationInitialeDetail.dateDeMiseAJour) : dateService.formatToFRLongDate(dateService.today().toString());

	return (
		<>
			<Head
				title={`${formationInitialeDetail.libelle} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterDetailFormationInitiale formationInitialeDetail={formationInitialeDetail}/>

			<Container className={styles.container}>
				<OnisepGeneralPartner headingLevel={'h2'}/>
				<div className={styles.partnerInfo}>
					<Icon name="information" className={styles.icon}/>
					<span>{`Idéo-fiches formations, Onisep, ${dataUpdatedDate}, sous licence ODBL`}</span>
				</div>
			</Container>
		</>
	);
};


