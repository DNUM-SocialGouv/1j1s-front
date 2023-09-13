import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { recupererLibelleDepuisValeur } from '~/client/utils/recupererLibelleDepuisValeur.utils';
import { isSuccess } from '~/server/errors/either';
import { radiusList } from '~/server/localisations/domain/localisation';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

interface InputCommuneProps {
	code: string
	distance?: string
	id?: string
	latitude?: string
	libellé: string
	longitude?: string
	showRadius?: boolean
	required?: boolean
	htmlLabel?: string
}

const MINIMUM_CHARACTER_NUMBER_FOR_SEARCH = 3;

function clickedOnSearchButton(target: Node) {
	return target.textContent === 'Rechercher'
		|| (target.parentNode !== undefined && target.parentNode?.textContent === 'Rechercher');
}

function isInputEmptyWhileUserClickedOnSearchButton(e: MouseEvent, libelléCommune: string): boolean {
	return clickedOnSearchButton((e.target) as Node)
		&& libelléCommune === '';
}

export const InputCommune = ({ className, code, distance, id, libellé, latitude, longitude, required = false, showRadius = true, htmlLabel = 'rechercherCommune' }: InputCommuneProps & React.HTMLAttributes<HTMLDivElement>) => {
	const localisationService = useDependency<LocalisationService>('localisationService');

	const [suggestionIndex, setSuggestionIndex] = useState(1);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [libelléCommune, setLibelléCommune] = useState<string>(libellé || '');
	const [codeCommune, setCodeCommune] = useState<string>(code || '');
	const [latitudeCommune, setLatitudeCommune] = useState<string>(latitude || '');
	const [longitudeCommune, setLongitudeCommune] = useState<string>(longitude || '');
	const [distanceCommune, setDistanceCommune] = useState<string>(distance || '');
	const [invalid, setInvalid] = useState(false);

	const [communeList, setCommuneList] = useState<Commune[]>([]);

	const autocompleteRef = useRef<HTMLDivElement>(null);

	const LOCALISATION_LABEL_ID = 'autocomplete-label';
	const LOCALISATION_SUGGESTIONS_ID = 'autocomplete-list-box';

	const DEFAULT_RADIUS_VALUE = '10';

	const clearCommune = useCallback(() => {
		setCodeCommune('');
		setLatitudeCommune('');
		setDistanceCommune('');
		setLongitudeCommune('');
		setLibelléCommune('');
	}, []);

	const cancelCommuneSelect = useCallback(() => {
		if (codeCommune === '') {
			clearCommune();
		}
		setSuggestionsActive(false);
	}, [codeCommune, clearCommune]);

	const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
		if (!(autocompleteRef.current)?.contains(e.target as Node)) {
			cancelCommuneSelect();
		}
		if (isInputEmptyWhileUserClickedOnSearchButton(e, libelléCommune)) {
			setInvalid(true);
		} else {
			setInvalid(false);
		}
	}, [autocompleteRef, cancelCommuneSelect, libelléCommune]);

	const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
		if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
			cancelCommuneSelect();
		}
		if ((e.key === KeyBoard.TAB || e.key === KeyBoard.ENTER) && suggestionsActive) {
			if (libelléCommune === '') {
				setInvalid(true);
			} else {
				setInvalid(false);
			}
		}
	}, [cancelCommuneSelect, libelléCommune, suggestionsActive]);

	useEffect(function gérerPerteDeFocus() {
		document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
		document.addEventListener('keyup', closeSuggestionsOnKeyUp);

		return () => {
			document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
			document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
		};
	}, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

	useEffect(function réinitialiserCommune() {
		if (libelléCommune === '') {
			clearCommune();
		}
	}, [libelléCommune, clearCommune]);

	useEffect(function initialiserCommune() {
		if (libellé === '' || code === '') {
			clearCommune();
		} else {
			setCodeCommune(code);
			setLatitudeCommune(latitude || '');
			setDistanceCommune(distance || '');
			setLongitudeCommune(longitude || '');
			setLibelléCommune(libellé);
		}
	}, [libellé, code, longitude, latitude, distance, clearCommune]);

	const rechercherCommune = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value.length >= MINIMUM_CHARACTER_NUMBER_FOR_SEARCH) {
			const response = await localisationService.rechercherCommune(value);
			if (isSuccess(response)) {
				setCommuneList(response.result.résultats ?? []);
				setCodeCommune('');
				setLatitudeCommune('');
				setLongitudeCommune('');
				setSuggestionsActive(value.length > 1);
				setSuggestionIndex(0);
			} else {
				// TODO: implement error management
			}
		}
	}, [localisationService]);

	const debounceRechercheCommune = useMemo(() => {
		return debounce(rechercherCommune, 300);
	}, [rechercherCommune]);

	useEffect(() => {
		return () => {
			debounceRechercheCommune.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isSuggestionListEmpty = useCallback(() => {
		return !communeList.length;
	}, [communeList]);

	const handleClick = (commune: Commune) => {
		setLibelléCommune(commune.libelle);
		setCodeCommune(commune.code);
		setLatitudeCommune(commune.coordonnées.latitude.toString());
		setLongitudeCommune(commune.coordonnées.longitude.toString());
		setDistanceCommune(distanceCommune || DEFAULT_RADIUS_VALUE);
		setSuggestionsActive(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === KeyBoard.ARROW_UP) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		} else if (event.key === KeyBoard.ARROW_DOWN) {
			setSuggestionIndex(suggestionIndex + 1);
		} else if (event.key === KeyBoard.ENTER) {
			event.preventDefault();
			if (!isSuggestionListEmpty() && ((codeCommune === '') || (libelléCommune && libelléCommune !== `${communeList[suggestionIndex].code}`))) {
				if (communeList) {
					setCodeCommune(communeList[suggestionIndex].code);
					setLatitudeCommune(communeList[suggestionIndex].coordonnées.latitude.toString());
					setLongitudeCommune(communeList[suggestionIndex].coordonnées.longitude.toString());
					setLibelléCommune(communeList[suggestionIndex].libelle);
					setDistanceCommune(distanceCommune || DEFAULT_RADIUS_VALUE);
				}
				setSuggestionsActive(false);
			}
		}
	};

	function SuggestionsCommuneList() {
		return (
			<ul
				className={styles.suggestionList}
				role="listbox"
				aria-labelledby={id || LOCALISATION_LABEL_ID}
				id={LOCALISATION_SUGGESTIONS_ID}
				data-testid="RésultatsCommune"
			>
				{communeList.length > 0 && communeList.map((suggestion, index) => (
					<li
						className={index === suggestionIndex ? styles.hover : ''}
						key={index}
						onClick={() => handleClick(suggestion)}
						role="option"
						aria-selected={libelléCommune === suggestion.libelle}
						value={suggestion.libelle}
					>
						{suggestion.libelle}
					</li>
				))}
				{communeList.length === 0 &&
            <li className={styles.aucunRésultat} data-testid="CommuneNoResultMessage">
                Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu.
                Exemple : Paris, ...
            </li>
				}
			</ul>
		);
	}

	return (
		<>
			<div className={classNames(styles.wrapper, className)}>
				<label htmlFor={htmlLabel} id={id || LOCALISATION_LABEL_ID} className={styles.label}>
					Localisation
				</label>
				<div ref={autocompleteRef}>
					<div
						id={id ? `header-search-${id}` : 'header-search'}
						role="combobox"
						aria-expanded={suggestionsActive}
						aria-controls={suggestionsActive ? LOCALISATION_SUGGESTIONS_ID : undefined}
						aria-owns={suggestionsActive ? LOCALISATION_SUGGESTIONS_ID : undefined}
						aria-haspopup="listbox"
					>
						<input
							type="text"
							id={htmlLabel}
							name="libelleCommune"
							data-testid="InputCommune"
							autoComplete="off"
							aria-autocomplete="list"
							aria-controls={suggestionsActive ? LOCALISATION_SUGGESTIONS_ID : undefined}
							aria-activedescendant={htmlLabel}
							placeholder={'Exemples : Paris, Béziers...'}
							className={classNames(styles.formControlInput, required && invalid && styles.formControlInputError)}
							value={libelléCommune}
							onChange={(event) => {
								setLibelléCommune(event.target.value);
								debounceRechercheCommune(event);
							}}
							onKeyDown={handleKeyDown}
							onClick={() => setSuggestionsActive(!!codeCommune)}
							required={required}
						/>
						{(required && invalid) && (
							<span className={classNames(styles.instructionMessageError)}>
                Veuillez saisir une localisation
							</span>
						)}
						<input type="hidden" name="codeCommune" value={codeCommune}/>
						<input type="hidden" name="latitudeCommune" value={latitudeCommune}/>
						<input type="hidden" name="longitudeCommune" value={longitudeCommune}/>
					</div>
					{suggestionsActive && <SuggestionsCommuneList/>}
				</div>
			</div>
			{codeCommune && showRadius &&
			<Select
				label="Rayon"
				name="distanceCommune"
				placeholder={recupererLibelleDepuisValeur(radiusList, distanceCommune)}
				optionList={radiusList}
				onChange={setDistanceCommune}
				value={distanceCommune}
			/>
			}
		</>
	);
};
