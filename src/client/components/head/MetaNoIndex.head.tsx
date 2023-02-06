import Head from 'next/head';
import React from 'react';

export function MetaNoIndex() {
	return (
		<Head>
			<meta name="robots" content="noindex" />
		</Head>
	);
}
