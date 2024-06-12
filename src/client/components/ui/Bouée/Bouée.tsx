import classNames from 'classnames';
import React, { RefObject, useEffect } from 'react';

import styles from '~/client/components/ui/Bouée/Bouée.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useDebouncedState from '~/client/hooks/useDebouncedState';

export default function Bouée ({ surface }: { surface: RefObject<HTMLElement> }) {
	const [isDown, setIsDown] = useDebouncedState(false, 50);

	useEffect(() => {
		function onScroll () {
			if (surface.current) {
				const { y } = surface.current.getBoundingClientRect();
				y < 0 ? setIsDown(true) : setIsDown(false);
			}
		}
		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
  }, [surface]); // eslint-disable-line
	// eslint croit que c'est une bonne idée de mettre `setIsDown` dans les dépendances ¯\_(ツ)_/¯
	// alors qu'en pratique, ça fait une boucle infinie.

	function toSurface () {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}

	return (
		<Link
			className={ classNames({ [styles.bouée]: true, [styles.enabled]: isDown, [styles.disabled]: !isDown })}
			hidden={ !isDown }
			onClick={ toSurface }
			href="#skip-link-list"
		>
			<Icon name={'angle-up'} aria-hidden={false} aria-label='Remonter en haut de la page' />
		</Link>
	);
}

