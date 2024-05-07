import { DateService } from '../date.service';

export class JsDateService implements DateService {
	formatToHumanReadableDate(date: string | Date): string {
		if(date instanceof Date) {
			date.toLocaleDateString('fr-FR', { dateStyle: 'long' });
		}
		return new Date(date).toLocaleDateString('fr-FR', { dateStyle: 'long' });
	}

	today(): Date {
		return new Date();
	}
}
