import { useRouter } from 'next/router';
import React, {
	Dispatch,
	FormEvent,
	SetStateAction,
	useRef,
	useState,
} from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { ComboboxLocalisation } from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	mapToDefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/defaultLocalisation/mapToDefaultLocalisation';
import { Input } from '~/client/components/ui/Form/Input';
import { SelectMultiple } from '~/client/components/ui/Form/Select/SelectMultiple';
import { SelectSimple } from '~/client/components/ui/Form/Select/SelectSimple';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
	mapRéférentielDomaineToOffreCheckboxFiltre,
	mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { estQueryIdentiqueAAsPath } from '~/client/utils/queryString.util';
import { EXPÉRIENCE, TEMPS_DE_TRAVAIL_LIST, TYPE_DE_CONTRAT_LIST } from '~/server/offres/domain/offre';

type FormulaireRechercheOffreEmploiProps = {
	enEtatErreur?: boolean
}

export function FormulaireRechercheOffreEmploi({ enEtatErreur = false }: FormulaireRechercheOffreEmploiProps) {
	const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

	const queryParams = useOffreQuery();
	const router = useRouter();

	const [inputTypeDeContrat, setInputTypeDeContrat] = useState(queryParams.typeDeContrats ? queryParams.typeDeContrats.split(',') : []);
	const [inputExpérience, setInputExpérience] = useState(queryParams.experienceExigence ?? '');
	const [inputTempsDeTravail, setInputTempsDeTravail] = useState(queryParams.tempsDeTravail ?? '');
	const [inputDomaine, setInputDomaine] = useState(queryParams.grandDomaine ? queryParams.grandDomaine.split(',') : []);

	const inputLocalisation = mapToDefaultLocalisation(queryParams.codeLocalisation, queryParams.typeLocalisation, queryParams.nomLocalisation, queryParams.codePostalLocalisation);

	function updateRechercherOffreEmploiQueryParams(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		// NOTE: en état d‘erreur, resoumettre à l‘identique est le geste de réessai de l‘utilisateur : la garde doit être levée.
		if (!enEtatErreur && estQueryIdentiqueAAsPath(router.asPath, query)) return;
		router.push({ query }, undefined, { scroll: false });
	}

	function onChangeMultipleSelect(option: HTMLElement, setInputValue: Dispatch<SetStateAction<Array<string>>>) {
		const value = option.getAttribute('data-value') ?? '';
		setInputValue((previous) => {
			const indexOfValue = previous.indexOf(value);
			if (value && indexOfValue === -1) {
				previous.push(value);
			} else {
				previous.splice(indexOfValue, 1);
			}
			return previous;
		});
	}

	return (
		<form
			ref={rechercheOffreEmploiForm}
			aria-label="Rechercher une offre d'emploi"
			onSubmit={updateRechercherOffreEmploiQueryParams}
			role="search">
			<div>
				<Champ className="fr-input-group">
					<Champ.Label>
						Métier, mot-clé (minimum 2 caractères)
						<Champ.Label.Complement>Exemples : boulanger, informatique…</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input
						render={Input}
						defaultValue={queryParams.motCle}
						name="motCle"
						minLength={2} />
					<Champ.Error />
				</Champ>

				<div className='fr-select-group'>
					<ComboboxLocalisation defaultValue={inputLocalisation}/>
				</div>
				<Champ className='fr-select-group'>
					<Champ.Label>
						Types de contrats
						<Champ.Label.Complement>Exemple : CDI, CDD…</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input
						render={SelectMultiple}
						optionsAriaLabel={'Types de contrats'}
						name={'typeDeContrats'}
						onChange={(option) => onChangeMultipleSelect(option, setInputTypeDeContrat)}
						value={inputTypeDeContrat}>
						{mapTypeDeContratToOffreEmploiCheckboxFiltre(TYPE_DE_CONTRAT_LIST).map((option) =>
							<SelectMultiple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectMultiple.Option>,
						)}
					</Champ.Input>
					<Champ.Error />
				</Champ>

				<Champ className="fr-select-group">
					<Champ.Label>
						Temps de travail
						<Champ.Label.Complement>Exemple : temps plein, temps partiel…</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input
						render={SelectSimple}
						optionsList={TEMPS_DE_TRAVAIL_LIST}
						name={'tempsDeTravail'}
						onChange={(optionValue) => setInputTempsDeTravail(optionValue)}
						value={inputTempsDeTravail}>
					</Champ.Input>
					<Champ.Error />
				</Champ>

				<Champ className="fr-select-group">
					<Champ.Label>
						Niveau demandé
						<Champ.Label.Complement>Exemple : De 1 à 3 ans</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input
						render={SelectSimple}
						optionsList={EXPÉRIENCE}
						name={'experienceExigence'}
						onChange={(optionValue) => setInputExpérience(optionValue)}
						value={inputExpérience}>
					</Champ.Input>
					<Champ.Error />
				</Champ>

				<Champ className='fr-select-group'>
					<Champ.Label>
						Domaines
						<Champ.Label.Complement>Exemple : Commerce, Immobilier…</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input
						render={SelectMultiple}
						optionsAriaLabel={'Domaines'}
						name={'grandDomaine'}
						onChange={(option) => onChangeMultipleSelect(option, setInputDomaine)}
						value={inputDomaine}>
						{mapRéférentielDomaineToOffreCheckboxFiltre(référentielDomaineList).map((option) =>
							<SelectMultiple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectMultiple.Option>,
						)}
					</Champ.Input>
					<Champ.Error />
				</Champ>
			</div>
			<div>
				<ButtonComponent
					icon={<Icon name="magnifying-glass" />}
					iconPosition="right"
					label="Rechercher"
					type="submit" />
			</div>
		</form>
	);
}
