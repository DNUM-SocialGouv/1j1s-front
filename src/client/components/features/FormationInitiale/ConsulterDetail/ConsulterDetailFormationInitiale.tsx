import React from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
	FormationInitialeDetail,
} from '~/server/formations-initiales/domain/formationInitiale';

import styles from './ConsulterDetailFormationInitiale.module.scss';

export function ConsulterDetailFormationInitiale({ formationInitialeDetail }: { formationInitialeDetail: FormationInitialeDetail }) {
	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{formationInitialeDetail.libelle}</h1>
				<TagList list={formationInitialeDetail.tags}/>
			</header>
		</ConsulterOffreLayout>
	);
}
