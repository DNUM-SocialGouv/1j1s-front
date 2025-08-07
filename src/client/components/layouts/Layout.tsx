import React, { useEffect, useRef } from 'react';

import Footer from '~/client/components/layouts/Footer/Footer';
import { Header } from '~/client/components/layouts/Header/Header';
import Bouée from '~/client/components/ui/Bouée/Bouée';
import SkipLink from '~/client/components/ui/SkipLink/SkipLink';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MarketingService } from '~/client/services/marketing/marketing.service';

export function Layout({ children }: React.PropsWithChildren) {
	const surface = useRef<HTMLDivElement>(null);
	const seedtagService = useDependency<MarketingService>('seedtagService');
	useEffect(() => {
		// @ts-expect-error
		seedtagService.trackPage(window.location.href, 'fr_di00+standard');
		// eslint-disable-next-line
	}, []);

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
