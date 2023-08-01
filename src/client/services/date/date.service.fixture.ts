import { DateService } from './date.service';

export function aDateService(override?: Partial<DateService>): DateService {
	return {
		formatToFRLongDate: jest.fn(),
		today: jest.fn(),
		...override,
	};
}
