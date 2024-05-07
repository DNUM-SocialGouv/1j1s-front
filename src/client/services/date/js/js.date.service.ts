import { DateService } from '../date.service';

export class JsDateService implements DateService {
	formatToHumanReadableDate(date: string | Date): string {
		const result = (date instanceof Date) ? date : new Date(date);
		return result.toLocaleDateString('fr-FR', { dateStyle: 'long' });
	}

	today(): Date {
		return new Date();
	}
}
