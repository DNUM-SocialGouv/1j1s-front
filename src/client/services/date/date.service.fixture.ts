import { DateService } from './date.service';

export function aDateService(override?: Partial<DateService>): DateService {
	return {
		formatToHumanReadableDate: vi.fn(),
		today: vi.fn(),
		...override,
	};
}
