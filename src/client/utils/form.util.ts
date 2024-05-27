// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormAsQuery(formElement: HTMLFormElement, queryParamsWhitelist: Record<string, any>, appendPageQueryParam = true): string {
	const formData = new FormData(formElement);
	let formEntries = Array.from(
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
	formEntries = regroupFormEntriesByName(formEntries);

	if (appendPageQueryParam) {
		formEntries.push(['page', '1']);
	}

	return new URLSearchParams(formEntries).toString();
}

function regroupFormEntriesByName(formEntries: Array<Array<string>>) {
	const formEntriesGrouped: Array<Array<string>> = [];
	formEntries.map((entryToGroup) => {
		const indexEntryAlreadyGrouped = formEntriesGrouped.findIndex((entryAlreadyGrouped) => entryAlreadyGrouped[0] === entryToGroup[0]);
		if (indexEntryAlreadyGrouped === -1) {
			formEntriesGrouped.push([entryToGroup[0], entryToGroup[1]]);
		} else {
			const entryToConcataneWithNewValue = formEntriesGrouped[indexEntryAlreadyGrouped];
			entryToConcataneWithNewValue[1] = entryToConcataneWithNewValue[1].concat(',', entryToGroup[1]);
		}
	});

	return formEntriesGrouped;
}
