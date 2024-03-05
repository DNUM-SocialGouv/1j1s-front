import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
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
	const urlDepotOffreStage2de = process.env.NEXT_PUBLIC_DEPOT_STAGES_SECONDE_URL ?? '';

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
					<Link href={urlDepotOffreStage2de} className={styles.headerBodyBanner} data-testid="desktop-banner-stages">
						<div>
							<div className={styles.headerBodyBannerTitle}>Vous souhaitez accueillir des stagiaires de 2de&nbsp;?
							</div>
							<div className={styles.headerBodyBannerContent}>Déposer une offre&nbsp;!</div>
						</div>
						<Icon className={styles.headerBodyBannerIcon} name="angle-right"/>
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
