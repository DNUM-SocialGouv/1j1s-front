import classNames from 'classnames';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/InstantSearch/ListeDesResultats.module.scss';
import { Skeleton } from '~/client/components/ui/Loader/Skeleton/Skeleton';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

interface ListeDesResultatsProps {
	resultats: React.ReactElement
	isLoading: boolean
	isAffichageListeDeResultatsDesktopDirectionRow: boolean
	skeletonRepeat: number
	pagination: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const ListeDesResultats = React.forwardRef<HTMLElement | null, ListeDesResultatsProps>((props: ListeDesResultatsProps, outerRef) => {
	const { resultats, isLoading, isAffichageListeDeResultatsDesktopDirectionRow, skeletonRepeat, pagination } = props;
	const ref = useSynchronizedRef(outerRef);

	return (
		<section className={styles.listeDesResultatsWrapper} ref={ref}>
			<Container
				className={classNames({ [styles.listeDesResultats]: !isAffichageListeDeResultatsDesktopDirectionRow })}>
				<Skeleton
					type="card"
					isLoading={isLoading}
					repeat={skeletonRepeat}
					className={classNames({ [styles.skeletonAffichageDesktopDirectionRow]: !isAffichageListeDeResultatsDesktopDirectionRow })}
				>
					<>
						{resultats}
						{pagination}
					</>
				</Skeleton>
			</Container>
		</section>
	);
});
