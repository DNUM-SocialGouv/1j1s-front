export function getFormAsQuery(formElement: HTMLFormElement, queryParamsWhitelist: Record<string, unknown>, appendPageQueryParam = true): string {
	const formData = new FormData(formElement);
	const formEntries = Array.from(
		formData,
		([key, value]) => (
			[key, typeof value === 'string' ? value : value.name]
		),
	).filter((inputData) => {
		const inputName = inputData[0];
		const inputValue = inputData[1];
		return inputName in queryParamsWhitelist && inputValue !== '' && inputValue !== 'false';
	});

	// TODO (BRUJ 27/05/2024): ne plus regrouper mais conserver les n array en modifiant côté serveur
	const groupedFormEntries = regroupFormEntriesByName(formEntries);

	if (appendPageQueryParam) {
		groupedFormEntries.push(['page', '1']);
	}

	return new URLSearchParams(groupedFormEntries).toString();
}

type Name = string;
type Value = string;
type JoinedValues = string;
type GroupedValues = Record<string, Array<string>>;
const NAME_INDEX = 0;
const VALUE_INDEX = 1;

// Entrée : [['typeDeContrat', 'CDD'], ['typeDeContrat', 'CDI'], ['durée', '2mois']]
// Sortie : [['typeDeContrat', 'CDD,CDI'], ['durée', '2mois']]
function regroupFormEntriesByName(formEntries: Array<[Name, Value]>): Array<[Name, JoinedValues]> {
	const formEntriesGrouped = formEntries.reduce<GroupedValues>((groups, entry) => {
		const name = entry[NAME_INDEX];
		if (groups[name] == null) {
			groups[name] = [];
		}
		groups[name].push(entry[VALUE_INDEX]);
		return groups;
	}, {});

	return Object.entries(formEntriesGrouped)
		.map(([name, values]) => ([name, values.join(',')]));
}
