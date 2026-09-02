import React, { useRef } from 'react';

import { Footer, Header, SkipLink } from '~/client/dsfr';
import Bouée from '~/client/components/ui/Bouée/Bouée';

export function Layout({ children }: React.PropsWithChildren) {
	const surface = useRef<HTMLDivElement>(null);

	return (
		<div ref={ surface }>
			<SkipLink />
			<Header />
			{children}
			<Footer />
			<Bouée surface={ surface } />
		</div>
	);
}
