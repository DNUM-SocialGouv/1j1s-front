import Link from 'next/link';

export function CampagneApprentissage() {
	return (
		<main id="contenu">
			<h1>L’apprentissage : pour moi c’est le bon choix</h1>
			<p>Avant de démarrer la simulation de vos aides, pensez à vous munir de vos ressources et de celles de vos parents si vous êtes encore à leur charge.</p>
			<Link href={'/apprentissage/simulation'}>Simuler ma rémunération</Link>
		</main>
	);
}
