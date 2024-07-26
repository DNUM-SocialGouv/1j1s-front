import React, { FormEvent, useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { URL_DEPOSER_OFFRE } from '~/pages/stages/deposer-offre/index.page';

import styles from './AccompagnementFormulaireCommon.module.scss';


const NAME_CHECKBOX = 'besoin';
type AutresBesoins = Pick<FormulairesProps, 'onBackButton' | 'setIsMissionLocaleModalOpen' | 'setIsInscriptionFranceTravailModalOpen'>
export default function AutresBesoins26ans(
	{
		onBackButton,
		setIsMissionLocaleModalOpen,
		setIsInscriptionFranceTravailModalOpen,
	}: AutresBesoins) {
	
	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const isMoreThanOneCheckboxSelected = formData.getAll(NAME_CHECKBOX).length > 0;
		isMoreThanOneCheckboxSelected ? setIsMissionLocaleModalOpen(true) : setIsInscriptionFranceTravailModalOpen(true);
	}

	return <>
		<ButtonComponent
			appearance={'quaternary'}
			className={styles.boutonRetour}
			onClick={() => setTypeFormulaireAffiché('Handicap')}
			label="Retour"
			icon={<Icon name={'angle-left'}/>}
			iconPosition={'left'}
		/>
		<form onSubmit={onSubmit}>
			<p className={styles.question}></p>
			<fieldset className={styles.fieldset}>
				<legend className={styles.question}>Rencontrez-vous d’autres besoins ?</legend>
				<div className={styles.autresBesoinsContainer}>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Logement"/>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Santé"/>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Difficultés administratives ou juridiques"/>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Problématique d‘accès aux droits"/>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Maîtrise de français"/>
					<Checkbox
						className={styles.checkbox}
						name={NAME_CHECKBOX}
						label="Contraintes familiales"/>
				</div>
			</fieldset>
			<ButtonComponent label="Valider" className={styles.accompagnementValider}/>
		</form>

	</>;
}
