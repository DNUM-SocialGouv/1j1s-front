import { Combobox } from '~/client/components/ui/Form/Combobox';
import {
	formatLocalisationLibelle,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	LocalisationOptions,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/Localisation/LocalisationOptions/LocalisationOptions';

type SuggestionsLocalisationListProps = {
	localisationOptions: LocalisationOptions
	optionMessage: string
}
export const SuggestionsLocalisationList = ({ localisationOptions, optionMessage }: SuggestionsLocalisationListProps) => (
	<>
		{localisationOptions.regionList.length > 0 &&
			<Combobox.Category name="Régions">
				{localisationOptions.regionList.map((suggestion) =>
					(
						<Combobox.Option key={suggestion.code}>
							{formatLocalisationLibelle(suggestion.nom, suggestion.code)}
						</Combobox.Option>
					))}
			</Combobox.Category>
		}

		{localisationOptions.departementList.length > 0 &&
			<Combobox.Category name="Départements">
				{localisationOptions.departementList.map((suggestion) =>
					(
						<Combobox.Option key={suggestion.code}>
							{formatLocalisationLibelle(suggestion.nom, suggestion.code)}
						</Combobox.Option>
					))}
			</Combobox.Category>
		}

		{localisationOptions.communeList.length > 0 &&
			<Combobox.Category name="Communes">
				{localisationOptions.communeList.map((suggestion) =>
					(
						<Combobox.Option key={suggestion.codeInsee}>
							{formatLocalisationLibelle(suggestion.nom, suggestion.codePostal)}
						</Combobox.Option>
					))}
			</Combobox.Category>
		}
		<Combobox.AsyncMessage>
			{optionMessage}
		</Combobox.AsyncMessage>
	</>
);
