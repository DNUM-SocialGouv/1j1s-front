import React, { useRef } from 'react';

import { Footer, Header, SkipLink } from '~/client/dsfr';

export function Layout({ children }: React.PropsWithChildren) {
	const surface = useRef<HTMLDivElement>(null);

	return (
		<div ref={ surface }>
			<SkipLink />
			<Header />
			{children}
			<Footer />
		</div>
	);
}
