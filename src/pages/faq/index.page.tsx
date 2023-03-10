import React from 'react';

import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';

export default function FaqPage() {
	useAnalytics('faq');

	const displayFaq = process.env.NEXT_PUBLIC_FAQ_FEATURE === '1';
	if (!displayFaq) return null;
	return (
		<>
			<Head
				title="FAQ | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<h1>FAQ - Questions fréquemment posées </h1>
			</main>
		</>
	);
}
