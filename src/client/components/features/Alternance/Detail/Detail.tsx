import React from 'react';

import { Alternance } from '~/server/alternances/domain/alternance';

export function Detail({ annonce }: { annonce: Alternance }) {
	return (
		<>
			<h1>{annonce.titre}</h1>
			<p>{annonce.nomEntreprise}</p>
			<pre>{JSON.stringify(annonce, undefined, 2)}</pre>
		</>
	);
}
