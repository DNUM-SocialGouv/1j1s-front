import React, { useEffect, useState } from 'react';

import { Head } from '~/client/components/head/Head';

export default function UnJeuneUnPermis() {

	const [size, setSize] = useState(1000);

	const onClick = () => {
		setSize(size + 100);
	};

	useEffect(() => {
		window.parent.postMessage(
			{
				size: `${size}px`,
				type: 'resize-iframe',
			},
		);
	}, [size]);


	return (
		<main id="contenu">
			<Head
				title={'iframetest | 1jeune1solution'}
				robots="index,follow"
			/>
			<button onClick={onClick} style={{ height: (size - 700) }}>Clique ici pour me voir grandir !</button>
		</main>
	);
}


