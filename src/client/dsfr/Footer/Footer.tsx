import { Link } from '~/client/components/ui/Link/Link';

interface FooterLink {
	title: string
	url: string
}

const externalLinks: Array<FooterLink> = [
	{ title: 'legifrance.gouv.fr', url: 'https://www.legifrance.gouv.fr/' },
	{ title: 'gouvernement.fr', url: 'https://www.gouvernement.fr/' },
	{ title: 'service-public.fr', url: 'https://www.service-public.fr/' },
	{ title: 'data.gouv.fr', url: 'https://www.data.gouv.fr/' },
	{ title: 'france.fr', url: 'https://www.france.fr/' },
];

const helpfulLinks: Array<FooterLink> = [
	{ title: 'Plan du site', url: '/plan-du-site' },
	{ title: "Conditions générales d'utilisation", url: '/cgu' },
	{ title: 'Accessibilité : Partiellement conforme', url: '/accessibilite' },
	{ title: 'Mentions légales', url: '/mentions-legales' },
	{ title: 'Politique de confidentialité', url: '/confidentialite' },
];

export function Footer() {
	return (
		<footer className="fr-footer fr-pb-4w" role="contentinfo">
			<div className="fr-container">
				<div className="fr-footer__body">
					<div className="fr-footer__brand fr-enlarge-link">
						<p className="fr-logo">
							Ministère<br/>
							du travail<br/>
							et de l&apos;emploi
						</p>
					</div>
					<div className="fr-footer__content">
						<ul aria-label="Liens externes" className="fr-footer__content-list">
							{externalLinks.map((link) => (
								<li className="fr-footer__content-item" key={link.title}>
									<Link href={link.url} className="fr-footer__content-link" prefetch={false}>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="fr-footer__bottom">
					<ul aria-label="Liens utiles" className="fr-footer__bottom-list">
						{helpfulLinks.map(link => (
							<li className="fr-footer__bottom-item" key={link.title}>
								<Link href={link.url} className="fr-footer__bottom-link" prefetch={false}>{link.title}</Link>
							</li>
						))}
					</ul>
					<div className="fr-footer__bottom-copy">
						<p>Sauf mention contraire, tous les contenus de ce site sont sous licence&nbsp;
							<Link
								href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
								prefetch={false}>
								etalab-2.0
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
