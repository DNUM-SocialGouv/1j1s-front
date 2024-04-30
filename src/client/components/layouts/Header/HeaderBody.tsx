import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ENCART_CAMPAGNE_URL } from '~/client/components/layouts/Header/Header';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavMobile } from '~/client/components/layouts/Header/Navigation/NavMobile';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function HeaderBody() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const displayEncartDeCampagne = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

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
						title="1jeune1solution (retour à l'accueil)"
						aria-label="1jeune1solution (retour à l'accueil)"
					>
						1jeune1solution
					</Link>
				</div>
				{displayEncartDeCampagne &&
						<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBodyBanner} data-testid="desktop-encart-campagne">
							<p>
								<span className={styles.headerBodyBannerTitle}>Vous êtes intéressés par l’apprentissage et souhaitez en savoir plus&nbsp;?</span>
								<span className={styles.headerBodyBannerContent}>Retrouvez les replays des lives Instagram avec nos apprentis.</span>
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
					<NavMobile toggleModal={toggleModal}/>
				</ModalComponent.Content>
			</ModalComponent>
		</Container>
	);
}
