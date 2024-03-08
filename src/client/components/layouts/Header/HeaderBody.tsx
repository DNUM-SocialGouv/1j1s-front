import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ENCART_CAMPAGNE_URL } from '~/client/components/layouts/Header/Header';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderNavMobile } from '~/client/components/layouts/Header/HeaderNavMobile';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function HeaderBody() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const displayBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

	return (
		<Container className={styles.headerBodyContainer}>
			<div className={styles.headerBody}>
				<div className={styles.headerBodyLien}>
					<div className={styles.headerBodyLogoWrapper}>
						<Image
							src="/images/logos/république-française.svg"
							alt="République Française, Liberté, Egalité, Fraternité"
							width="88"
							height="80"
						/>
						<nav role={'navigation'} aria-label="ouvrir le menu principal" className={styles.headerBodyNavigationMobile}>
							<ButtonComponent
								appearance="quaternary"
								icon={<Icon name="burger-menu"/>}
								iconPosition="top"
								onClick={toggleModal}
								label="Menu"
								className={styles.headerBodyBurgerMenu}
							/>
						</nav>
					</div>
					<Link
						className={styles.headerBodyTitle}
			      href="/"
						title="1jeune1solution (retour à l'accueil) - République française, Liberté, Égalité, Fraternité"
						aria-label="1jeune1solution (retour à l'accueil) - République française, Liberté, Égalité, Fraternité"
					>
						1jeune1solution
					</Link>
				</div>
				{displayBanner &&
						<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBodyBanner} data-testid="desktop-encart-campagne">
							<p>
								<span className={styles.headerBodyBannerTitle}>Vous êtes en 2de générale ou technologique et vous cherchez un stage&nbsp;?</span>
								<span className={styles.headerBodyBannerContent}>L’ouverture du service est prévue le 25 mars</span>
							</p>
							<Link.Icon className={styles.headerBodyBannerIcon} name="angle-right"/>
						</Link>
				}
			</div>
			<ModalComponent close={toggleModal} isOpen={isModalOpen}>
				<ModalComponent.Title>
					<Icon name="menu"/>
					<span>Menu</span>
				</ModalComponent.Title>
				<ModalComponent.Content>
					<HeaderNavMobile toggleModal={toggleModal}/>
				</ModalComponent.Content>
			</ModalComponent>
		</Container>
	);
}
