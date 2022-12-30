export function formatEventDateTime(dateDebut: string, dateFin: string) {
	const dateTimeDebut = new Date(dateDebut);
	const dateTimeFin = new Date(dateFin);

	if (isSameDate(dateTimeDebut, dateTimeFin)) {
		return `${getLongDate(dateTimeDebut)} de ${getTime(dateTimeDebut)} à ${getTime(dateTimeFin)}`;
	}

	if (timeIsZero(dateTimeDebut)) {
		return `${getLongDate(dateTimeDebut)} - ${getLongDate(dateTimeFin)}`;
	}

	return `${getLongDate(dateTimeDebut)} à ${getTime(dateTimeDebut)} - ${getLongDate(dateTimeFin)} à ${getTime(dateTimeFin)}`;
}

export function getLongDate(date: Date) {
	return date.toLocaleString(undefined, {
		day: 'numeric',
		month: 'long',
		weekday: 'short',
	});
}

export function getTime(date: Date) {
	return date.toLocaleTimeString(undefined, { hour: '2-digit', minute:'2-digit' });
}

function isSameDate(dateDebut: Date, dateFin: Date) {
	return dateDebut.getFullYear() === dateFin.getFullYear() &&
    dateDebut.getMonth() === dateFin.getMonth() &&
    dateDebut.getDate() === dateFin.getDate();
}

function timeIsZero(dateDebut: Date) {
	return dateDebut.getHours() === 0 && dateDebut.getMinutes() === 0;
}
