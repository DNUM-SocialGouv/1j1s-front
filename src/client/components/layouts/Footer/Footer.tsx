import Image from 'next/legacy/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Footer/Footer.module.scss';
import { Link as LinkType } from '~/client/components/props';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

export default function Footer() {
	const linkList: Array<LinkType> = [
		{
			title: 'legifrance.gouv.fr',
			url: 'https://www.legifrance.gouv.fr/',
		},
		{
			title: 'gouvernement.fr',
			url: 'https://www.gouvernement.fr/',
		},
		{
			title: 'service-public.fr',
			url: 'https://www.service-public.fr/',
		},
		{
			title: 'data.gouv.fr',
			url: 'https://www.data.gouv.fr/',
		},
		{
			title: 'france.fr',
			url: 'https://www.france.fr/',
		},
	];

	const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';
	return (
		<footer id="footer">
			<p className={styles.preFooter}>
        Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 15 à 30 ans, sur tous les territoires.
			</p>
			<Container className={styles.footer}>
				<div className={styles.footerHeader}>
					<div className={styles.footerSlogan}>
						<div className={styles.footerLogo}>
							<Image src="/images/logos/mariane.svg" alt="" width="55" height="20" />
							<div className={styles.footerPropriétaire}>
								<span>Ministère du</span>
								<span>travail, de</span>
								<span>l‘emploi et de</span>
								<span>l‘insertion</span>
							</div>
							<div className={styles.footerDevise}>
								<Image src="/images/logos/devise.svg" alt="Liberté Égalité Fraternité" width="52" height="37" />
							</div>
						</div>
						<div className={styles.footerLogoFranceRelance}>
							<Image src="/images/logos/france-relance.svg" alt="Logo France relance" width="65" height="65" />
						</div>
					</div>
					<div className={styles.footerMessageWrapper}>
						<div className={styles.footerMessage}>
							<p>#1jeune1solution</p>
							<p>Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 15 à 30 ans, sur tous les territoires.</p>
						</div>
						<ul aria-label="Liens externes" className={styles.footerLienExterne}>
							{linkList.map((link) => (
								<li key={link.title}>
									<Link href={link.url} className={styles.footerLienExterneItem} prefetch={false}>
										<TextIcon icon="external-redirection">{link.title}</TextIcon>
									</Link>
								</li>))}
						</ul>
					</div>
				</div>
				<ul aria-label="Liens utiles" className={styles.footerLienUtile}>
					<li><Link href="/plan-du-site" className={styles.footerLienUtileItem} prefetch={false}>Plan du site</Link></li>
					<li><Link href="/cgu" className={styles.footerLienUtileItem} prefetch={false}>Conditions générales d‘utilisations</Link></li>
					<li><Link href="/accessibilite" className={styles.footerLienUtileItem} prefetch={false}>Accessibilité : Partiellement conforme</Link></li>
					<li><Link href="/mentions-legales" className={styles.footerLienUtileItem} prefetch={false}>Mentions légales</Link></li>
					<li><Link href="/confidentialite" className={styles.footerLienUtileItem} prefetch={false}>Politique de confidentialité</Link></li>
					<li>
						<Link href={`mailto:${MAIL_TO}`} prefetch={false} className={styles.linkContact}>
							<TextIcon icon="external-redirection">Nous contacter</TextIcon>
						</Link>
					</li>
				</ul>
				<p className={styles.footerCopyRight}>
          Sauf mention contraire, tous les contenus de ce site sont sous licence&nbsp;
					<Link
						className={styles.linkEtalab}
						href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
					>
						<TextIcon icon="external-redirection">etalab-2.0</TextIcon>
					</Link>
				</p>
			</Container>
		</footer>
	);
}
