import { JsDateService } from '~/client/services/date/js/js.date.service';

export function getDateStageFormatted(dateDebutMin: string, dateDebutMax?: string) {
	const dateService = new JsDateService();
	if (!dateDebutMax || dateDebutMin === dateDebutMax) return `Débute le ${dateService.formatToHumanReadableDate(dateDebutMin)}`;

	return `Débute entre le ${dateService.formatToHumanReadableDate(dateDebutMin)} et le ${dateService.formatToHumanReadableDate(dateDebutMax)}`;
}
