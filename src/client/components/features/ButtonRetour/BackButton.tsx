import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import {
	ButtonComponent,
} from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { PREVIOUS_PAGE } from '~/client/hooks/useDisplayBackButton';
import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

type BackButtonProps = Omit<React.ComponentPropsWithoutRef<typeof ButtonComponent>,'label'> & {
	label: string
	'aria-label': string
} | Omit<React.ComponentPropsWithoutRef<typeof ButtonComponent>,'label'> & {
	label?: never
}

export function BackButton({ className, label= 'Retour', ...rest }: BackButtonProps) {
	const router = useRouter();

	const [displayBackButton, setDisplayBackButton] = useState(false);
	useEffect(() => {
		const previousPage = isStorageAvailable('sessionStorage') ? sessionStorage.getItem(PREVIOUS_PAGE) : null;
		setDisplayBackButton(!!previousPage);
	}, []);

	return (
		displayBackButton &&
		<div className={className}>
			<Container>
				<ButtonComponent
					appearance="secondary"
					aria-label={'Retour vers la page précédente'}
					icon={<Icon name="angle-left" />}
					iconPosition="left"
					label={label}
					onClick={() => router.back()}
					{...rest}
				/>
			</Container>
		</div>
	);
}
