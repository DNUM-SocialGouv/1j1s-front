import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import {
	ButtonComponent,
} from '~/client/components/ui/Button/ButtonComponent';
import { REFERRER } from '~/client/hooks/useReferrer';

type BoutonRetourProps = React.ComponentPropsWithoutRef<typeof ButtonComponent>

export function ButtonRetour({ className, ...rest }: BoutonRetourProps) {
	
	const router = useRouter();

	const referrer = useMemo( () => {
		return sessionStorage.getItem(REFERRER);
	}, []);

	useEffect(() => {
		return () => {
			sessionStorage.removeItem(REFERRER);
		};
	}, []);

	if (referrer === null) return null;

	return (
		<div className={className}>
			<Container>
				<ButtonComponent
					appearance="secondary"
					aria-label={'Retour vers la page précédente'}
					onClick={() => router.back()}
					{...rest}
				/>
			</Container>
		</div>
	);
}
