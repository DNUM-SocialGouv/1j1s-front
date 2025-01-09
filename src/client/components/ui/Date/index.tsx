import React from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DateService } from '~/client/services/date/date.service';

type DateProps = React.ComponentPropsWithoutRef<'time'> & {
	date: Date,
}

export default function Date({ date, ...props }: DateProps) {
	const dateService = useDependency<DateService>('dateService');

	return (
		<time dateTime={date.toISOString()} {...props}>{dateService.formatToHumanReadableDate(date)}</time>
	);
};
