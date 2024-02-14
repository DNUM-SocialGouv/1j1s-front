import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { MAILTO_STAGE_3E_2DE } from '~/client/components/layouts/Header/Header';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderNavMobile } from '~/client/components/layouts/Header/HeaderNavMobile';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function HeaderBody() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isLargeScreen } = useBreakpoint();
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
						{!isLargeScreen &&
							<nav role={'navigation'} aria-label="ouvrir le menu principal">
								<ButtonComponent
									appearance="quaternary"
									icon={<Icon name="burger-menu"/>}
									iconPosition="top"
									onClick={toggleModal}
									label="Menu"
									className={styles.headerBodyBurgerMenu}
								/>
							</nav>
						}
					</div>
					<LinkDeprecated
						className={styles.headerBodyTitle}
			      href="/"
						title="1jeune1solution (retour à l'accueil) - République française, Liberté, Égalité, Fraternité"
						aria-label="1jeune1solution (retour à l'accueil) - République française, Liberté, Égalité, Fraternité"
					>
						1jeune1solution
					</LinkDeprecated>
				</div>
				{isLargeScreen && displayBanner &&
					<LinkDeprecated href={MAILTO_STAGE_3E_2DE} className={styles.headerBodyBanner}>
						<div>
							<div className={styles.headerBodyBannerTitle}>Vous voulez accueillir des stagiaires de 3e et 2de&nbsp;?
							</div>
							<div className={styles.headerBodyBannerContent}>Envoyez nous un e-mail&nbsp;!</div>
						</div>
						<Icon className={styles.headerBodyBannerIcon} name="angle-right"/>
					</LinkDeprecated>
				}
			</div>
			{!isLargeScreen &&
				<ModalComponent close={toggleModal} isOpen={isModalOpen}>
					<ModalComponent.Title>
						<Icon name="menu"/>
						<span>Menu</span>
					</ModalComponent.Title>
					<ModalComponent.Content>
						<HeaderNavMobile toggleModal={toggleModal}/>
					</ModalComponent.Content>
				</ModalComponent>
			}
		</Container>
	);
}
