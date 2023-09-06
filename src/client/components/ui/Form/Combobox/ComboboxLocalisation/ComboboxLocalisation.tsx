import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { Combobox } from '~/client/components/ui/Form/Combobox';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { BffLocalisationService } from '~/client/services/localisation/bff.localisation.service';
import { isSuccess } from '~/server/errors/either';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ...';
const MESSAGE_CHARGEMENT = 'Chargement ...';
const MESSAGE_CHAMP_VIDE = 'Commencez à taper pour rechercher un lieu';
const DEFAULT_LABEL = 'Localisation';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
type ComboboxPropsWithOmit = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby' | 'defaultValue' | 'label'>
type ComboboxLocalisationProps = ComboboxPropsWithOmit & {
	label?: string,
	defaultValue?: DefaultValue | undefined,
	debounceTimeout?: number,
	'aria-label'?: React.HTMLProps<'input'>['aria-label'],
	'aria-labelledby'?: React.HTMLProps<'input'>['aria-labelledby'],
}
type FetchStatus = 'init' | 'pending' | 'success' | 'failure';

type Commune = {
	codeInsee: string
	codePostal: string
	nom: string
}

type Departement = {
	code: string
	nom: string
}

type Region = {
	code: string
	nom: string
}

type LocalisationsSuggestionsState = {
	communeList: Commune[]
	departementList: Departement[]
	regionList: Region[]
}

export type DefaultValue = {
	code: string
	nom: string
	type: TypeLocalisation.DEPARTEMENT | TypeLocalisation.REGION
} | {
	codeInsee: string
	codePostal: string
	nom: string
	type: TypeLocalisation.COMMUNE
}

function mapLocalisationState(localisationList: RechercheLocalisationApiResponse): LocalisationsSuggestionsState {
	return {
		communeList: localisationList.communeList.map((commune) => ({
			codeInsee: commune.code,
			codePostal: commune.codePostal,
			nom: commune.nom,
		})),
		departementList: localisationList.departementList,
		regionList: localisationList.regionList,
	};
}

function findMatchingOption(localisationList: LocalisationsSuggestionsState, userInput: string) {
	const communeFound = localisationList.communeList.find((commune) => userInput === formatLocalisationLibelle(commune.nom, commune.codePostal));
	if (communeFound) {
		return {
			code: communeFound.codeInsee,
			codePostal: communeFound.codePostal,
			nom: communeFound.nom,
			type: TypeLocalisation.COMMUNE,
		};
	}

	const departementFound = localisationList.departementList.find((departement) => userInput === formatLocalisationLibelle(departement.nom, departement.code));
	if (departementFound) {
		return {
			code: departementFound.code,
			nom: departementFound.nom,
			type: TypeLocalisation.DEPARTEMENT,
		};
	}

	const regionFound = localisationList.regionList.find((region) => userInput === formatLocalisationLibelle(region.nom, region.code));
	if (regionFound) {
		return {
			code: regionFound.code,
			nom: regionFound.nom,
			type: TypeLocalisation.REGION,
		};
	}
	return null;
}

export function formatLocalisationLibelle(nom: string, code: string) {
	return `${nom} (${code})`;
}

function buildLibelle(defaultValue?: DefaultValue) {
	if (!defaultValue) return '';

	if (defaultValue.type === TypeLocalisation.DEPARTEMENT || defaultValue.type === TypeLocalisation.REGION) {
		return formatLocalisationLibelle(defaultValue.nom, defaultValue.code);
	} else if (defaultValue.type === TypeLocalisation.COMMUNE) {
		return formatLocalisationLibelle(defaultValue.nom, defaultValue.codePostal);
	}
	return '';
}

export const ComboboxLocalisation = (props: ComboboxLocalisationProps) => {
	const {
		label = DEFAULT_LABEL,
		defaultValue,
		onChange: onChangeProps = () => null,
		debounceTimeout = 300,
		id: idProps,
		onInvalid: onInvalidProps = () => null,
		'aria-labelledby': ariaLabelledby = '',
		'aria-describedby': ariaDescribedby = '',
		...rest
	} = props;

	const localisationService = useDependency<BffLocalisationService>('localisationService');

	const [userInput, setUserInput] = useState<string>(buildLibelle(defaultValue));
	const [localisationList, setLocalisationList] = useState<LocalisationsSuggestionsState>({
		communeList: defaultValue?.type === TypeLocalisation.COMMUNE ? [defaultValue] : [],
		departementList: defaultValue?.type === TypeLocalisation.DEPARTEMENT ? [defaultValue] : [],
		regionList: defaultValue?.type === TypeLocalisation.REGION ? [defaultValue] : [],
	});
	const [status, setStatus] = useState<FetchStatus>('init');
	const [fieldError, setFieldError] = useState<string | null>(null);

	const matchingOption = findMatchingOption(localisationList, userInput);

	const LOCALISATION_LABEL_ID = useId();
	const idState = useId();
	const LOCALISATION_INPUT_ID = idProps ?? idState;
	const errorId = useId();

	const rechercherLocalisation = useCallback(async (userInput: string) => {
		const response = await localisationService.rechercherLocalisation(userInput);

		if (response && isSuccess(response)) {
			setStatus('success');
			setLocalisationList(mapLocalisationState(response.result));
		} else {
			setStatus('failure');
			setLocalisationList({ communeList: [], departementList: [], regionList: [] });
		}
	}, [localisationService]);

	const handleRechercherWithDebounce = useMemo(() => {
		return debounce(rechercherLocalisation, debounceTimeout);
	}, [rechercherLocalisation, debounceTimeout]);

	const getLocalisationDebounced = useCallback(async function (userInput: string) {
		if (localisationService.isInvalidLocalisationQuery(userInput)) {
			setLocalisationList({ communeList: [], departementList: [], regionList: [] });
			return;
		}
		setStatus('pending');

		handleRechercherWithDebounce(userInput);
	}, [handleRechercherWithDebounce, localisationService]);

	useEffect(() => {
		return () => {
			handleRechercherWithDebounce.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isSuggestionListEmpty = useCallback(() => {
		return !localisationList.departementList.length && !localisationList.regionList.length && !localisationList.communeList.length;
	}, [localisationList]);

	function SuggestionsLocalisationList() {
		return (
			<>
				{localisationList.regionList.length > 0 &&
				  <Combobox.Category name="Régions">
				    {localisationList.regionList.map((suggestion) =>
					    (
						    <Combobox.Option key={suggestion.code}>
							    {suggestion.nom} ({suggestion.code})
						    </Combobox.Option>
					    ))}
				  </Combobox.Category>
				}

				{localisationList.departementList.length > 0 &&
				  <Combobox.Category name="Départements">
				    {localisationList.departementList.map((suggestion) =>
					    (
						    <Combobox.Option key={suggestion.code}>
							    {suggestion.nom} ({suggestion.code})
						    </Combobox.Option>
					    ))}
				  </Combobox.Category>
				}

				{localisationList.communeList.length > 0 &&
				  <Combobox.Category name="Communes">
				    {localisationList.communeList.map((suggestion) =>
					    (
							  <Combobox.Option key={suggestion.codeInsee}>
								  {suggestion.nom} ({suggestion.codePostal})
							  </Combobox.Option>
				      ))}
				  </Combobox.Category>
				}
			  <Combobox.AsyncMessage>
				  {
					  localisationService.isInvalidLocalisationQuery(userInput) && MESSAGE_CHAMP_VIDE
					  || status === 'failure' && MESSAGE_ERREUR_FETCH
					  || status === 'pending' && MESSAGE_CHARGEMENT
					  || isSuggestionListEmpty() && MESSAGE_PAS_DE_RESULTAT
				  }
			  </Combobox.AsyncMessage>
			</>
		);
	}

	return (
		<div className={styles.wrapper}>
			<label htmlFor={LOCALISATION_INPUT_ID} id={LOCALISATION_LABEL_ID} className={styles.label}>
				{label}
			</label>
			<Combobox
				aria-labelledby={`${LOCALISATION_LABEL_ID} ${ariaLabelledby}`}
				aria-describedby={`${ariaDescribedby} ${errorId}`}
				id={LOCALISATION_INPUT_ID}
				value={userInput}
				onChange={
					(event, newUserInput) => {
						setFieldError(null);
						getLocalisationDebounced(newUserInput);
						setUserInput(newUserInput);
						onChangeProps(event, newUserInput);
					}
				}
				onInvalid={(event) => {
					setFieldError(event.currentTarget.validationMessage);
					onInvalidProps(event);
				}}
				requireValidOption
				filter={Combobox.noFilter}
				{...rest}
			>
				{SuggestionsLocalisationList()}
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
			<input type="hidden" value={matchingOption?.nom ?? ''} name="nomLocalisation"/>
			<input type="hidden" value={matchingOption?.codePostal ?? ''} name="codePostalLocalisation"/>
			<input type="hidden" value={matchingOption?.code ?? ''} name="codeLocalisation"/>
			<input type="hidden" value={matchingOption?.type ?? ''} name="typeLocalisation"/>
		</div>
	);
};
