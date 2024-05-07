import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DateService } from '~/client/services/date/date.service';

export function DateStageFormatted(dateDebutMin: string, dateDebutMax?: string) {
	const dateService = useDependency<DateService>('dateService');

	if (!dateDebutMax || dateDebutMin === dateDebutMax) return `Débute le ${dateService.formatToHumanReadableDate(dateDebutMin)}`;

	return `Débute entre le ${dateService.formatToHumanReadableDate(dateDebutMin)} et le ${dateService.formatToHumanReadableDate(dateDebutMax)}`;
}
