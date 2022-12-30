import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { REFERRER } from '~/client/hooks/useReferrer';

export function ButtonRetour({ className }: React.HTMLProps<HTMLButtonElement>) {
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
					aria-label={`Retour vers la page ${referrer}`}
					icon={<Icon name="angle-left" />}
					iconPosition="left"
					label="Retour"
					onClick={() => router.back()}
				/>
			</Container>
		</div>
	);
}
