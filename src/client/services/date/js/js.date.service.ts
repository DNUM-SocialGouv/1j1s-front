import { DateService } from '../date.service';

export class JsDateService implements DateService {
	formatToHumanReadableDate(date: Date): string {
		return date.toLocaleDateString('fr-FR', { dateStyle: 'long' });
	}

	today(): Date {
		return new Date();
	}
}
