import dynamic from 'next/dynamic';
import React, { useRef } from 'react';

import { Header } from '~/client/components/layouts/Header/Header';
import Bouée from '~/client/components/ui/Bouée/Bouée';

const Footer = dynamic(() => import(/* webpackChunkName: 'footer' */ '~/client/components/layouts/Footer/Footer'), { ssr: false });
const SkipLink = dynamic(() => import(/* webpackChunkName: 'header' */ '~/client/components/ui/SkipLink/SkipLink'), { ssr: false });

export function Layout({ children }: React.PropsWithChildren) {
	const surface = useRef<HTMLDivElement>(null);

	return (
		<div ref={ surface }>
			<SkipLink/>
			<Header/>
			{children}
			<Footer/>
			<Bouée surface={ surface } />
		</div>
	);
}
