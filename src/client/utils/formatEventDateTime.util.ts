import { DateTime } from 'luxon';

export function formatEventDateTime(dateDebut: string, dateFin: string) {
  const dateTimeDebut = DateTime.fromISO(dateDebut);
  const dateTimeFin = DateTime.fromISO(dateFin);

  if (isSameDate(dateTimeDebut, dateTimeFin)) {
    return `${getLongDate(dateTimeDebut)} de ${getTime(dateTimeDebut)} à ${getTime(dateTimeFin)}`;
  }

  if (timeIsZero(dateTimeDebut)) {
    return `${getLongDate(dateTimeDebut)} - ${getLongDate(dateTimeFin)}`;
  }

  return `${getLongDateTime(dateTimeDebut)} - ${getLongDateTime(dateTimeFin)}`;
}

export function getLongDate(date: DateTime) {
  return date.toLocaleString({
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  });
}

export function getLongDateTime(date: DateTime) {
  return date.toLocaleString({
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    weekday: 'short',
  });
}

export function getTime(date: DateTime) {
  return date.toLocaleString(DateTime.TIME_SIMPLE);
}

function isSameDate(dateDebut: DateTime, dateFin: DateTime) {
  return dateDebut.toLocaleString() === dateFin.toLocaleString();
}

function timeIsZero(dateDebut: DateTime) {
  return dateDebut.hour === 0 && dateDebut.minute === 0;
}
