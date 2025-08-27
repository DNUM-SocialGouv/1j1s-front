import Script from 'next/script';
import React from 'react';

import { Head } from '~/client/components/head/Head';

import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '../../client/components/ui/Hero/LightHero';

export default function MyJobGlassesPage() {
	return (
		<>
			<Head
				title="Échanger avec des professionnels | 1jeune1solution"
				description="Échanger avec des professionels du métier de votre choix"
				robots="index,follow" />
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Échangez avec des professionnels</LightHeroPrimaryText>
						<LightHeroSecondaryText>avec MyJobGlasses</LightHeroSecondaryText>
					</h1>
				</LightHero>
				<div suppressHydrationWarning id="widget-my-job-glasses"></div>

				<Script async
					strategy="afterInteractive"
					crossOrigin="anonymous"
					src={`https://api.myjobglasses.com/widgets/professional_search/forms?widget_div_id=widget-my-job-glasses&widget_id=6877989596f4370015e24c85&rerender=${Date.now()}`} />
			</main>
		</>
	);

}

export function getServerSideProps() {
	if (process.env.NEXT_PUBLIC_MY_JOB_GLASSES_FEATURE != '1')
		return { notFound: true };
	return { props: {} };
}
