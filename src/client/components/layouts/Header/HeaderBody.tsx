import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderNavMobile } from '~/client/components/layouts/Header/HeaderNavMobile';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function HeaderBody() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isLargeScreen } = useBreakpoint();
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const displayBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

	return (
		<Container className={styles.headerBodyContainer}>
			<div className={styles.headerBody} >
				<div className={styles.headerBodyLogoWrapper}>
					<Image
						src="/images/logos/république-française.svg"
						alt=""
						width="88"
						height="80"
						aria-hidden="true"
					/>
					{ !isLargeScreen &&
						<nav role={'navigation'} aria-label="ouvrir le menu principal">
            	<ButtonComponent appearance='quaternary' icon={<Icon name='burger-menu'/>} iconPosition='top' onClick={toggleModal} label='Menu' />
						</nav>
					}
				</div>
				<div className={styles.headerBodyTitle}>1jeune1solution</div>
				{ isLargeScreen && displayBanner &&
				  <Link href="/contrat-engagement-jeune" className={styles.headerBodyBanner}>
				  	<div>
					    <div className={styles.headerBodyBannerTitle}>Découvrez le Contrat Engagement Jeune, la solution pour vous&nbsp;!</div>
					    <div className={styles.headerBodyBannerContent}>Un parcours personnalisé pour vous aider à définir votre projet professionnel et trouver un emploi</div>
				  	</div>
				  	<Icon className={styles.headerBodyBannerIcon} name='angle-right' />
				  </Link>
				}
			</div>
			{ !isLargeScreen &&
        <ModalComponent close={toggleModal} isOpen={isModalOpen}>
        	<ModalComponent.Title>
        		<Icon name="menu" />
        		<span>Menu</span>
        	</ModalComponent.Title>
        	<ModalComponent.Content>
        		<HeaderNavMobile toggleModal={toggleModal} />
        	</ModalComponent.Content>
        </ModalComponent>
			}
		</Container>
	);
}
