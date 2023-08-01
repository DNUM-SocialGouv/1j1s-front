import { DateService } from '../date.service';

export class JsDateService implements DateService {
	formatToHumanReadableDate(date: string): string {
		return new Date(date).toLocaleDateString('fr-FR', { dateStyle: 'long' });
	}

	today(): Date {
		return new Date();
	}
}
