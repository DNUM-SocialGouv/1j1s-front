import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FocusEvent, useCallback, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import {
	isNavigationItem,
	NavigationItem,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/Navigation/NavigationStructure';
import { Link } from '~/client/components/ui/Link/Link';
import { useExitModal } from '~/client/hooks/useExitModal';

interface HeaderNavEmployeurProps {
	item: NavigationItemWithChildren;
	onClick?: () => void;
}

export function HeaderNavEmployeur({ item, onClick }: HeaderNavEmployeurProps) {
	const router = useRouter();
	const containerRef = useRef<HTMLLIElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const menuId = 'mega-menu-employeur';

	const isActive = useMemo(() => checkIsActive(item, router.pathname), [item, router.pathname]);

	useExitModal(wrapperRef, isExpanded, () => isExpanded && setIsExpanded(false));

	const handleBlur = useCallback((event: FocusEvent<HTMLLIElement>) => {
		const stillInside = event.currentTarget.contains(event.relatedTarget);
		if (!stillInside) {
			setIsExpanded(false);
		}
	}, []);

	const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
		if (event.key === KeyBoard.ESCAPE) {
			setIsExpanded(false);
		}
	}, []);

	function handleItemClick() {
		setIsExpanded(false);
		onClick?.();
	}

	return (
		<li className="fr-nav__item" ref={containerRef} onBlur={handleBlur} onKeyUp={handleKeyUp}>
			<button
				className="fr-nav__btn"
				aria-expanded={isExpanded}
				aria-controls={menuId}
				aria-current={isActive ? true : undefined}
				onClick={(e) => {
					e.stopPropagation();
					setIsExpanded(!isExpanded);
				}}
			>
				{item.label}
			</button>
			<div
				ref={wrapperRef}
				className={classNames('fr-collapse', 'fr-mega-menu', { 'fr-collapse--expanded': isExpanded })}
				id={menuId}
			>
				<div className="fr-container fr-container--fluid fr-container-lg">
					<button className="fr-btn--close fr-btn" aria-controls={menuId} onClick={() => setIsExpanded(false)}>
						Fermer
					</button>
					<div className="fr-grid-row fr-grid-row-lg--gutters">
						{item.children.map((child) => (
							<MegaMenuSection
								key={isNavigationItem(child) ? child.link : child.label}
								item={child}
								currentPath={router.pathname}
								onItemClick={handleItemClick}
							/>
						))}
					</div>
				</div>
			</div>
		</li>
	);
}

function MegaMenuSection({
	item,
	currentPath,
	onItemClick,
}: {
	item: NavigationItem | NavigationItemWithChildren;
	currentPath: string;
	onItemClick: () => void;
}) {
	if (isNavigationItem(item)) {
		const isActive = item.link === currentPath;
		return (
			<div className="fr-col-12 fr-col-lg-3">
				<Link
					href={item.link}
					prefetch={false}
					className="fr-nav__link"
					aria-current={isActive ? 'page' : undefined}
					onClick={onItemClick}
				>
					{item.label}
				</Link>
			</div>
		);
	}

	return (
		<div className="fr-col-12 fr-col-lg-4">
			<h5 className="fr-mega-menu__category">{item.label}</h5>
			{item.legend && <p className="fr-mega-menu__leader">{item.legend}</p>}
			<ul className="fr-mega-menu__list">
				{item.children.map((child) => {
					if (!isNavigationItem(child)) return null;
					const isActive = child.link === currentPath;
					return (
						<li key={child.link}>
							<Link
								href={child.link}
								prefetch={false}
								className="fr-nav__link"
								aria-current={isActive ? 'page' : undefined}
								onClick={onItemClick}
							>
								{child.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function checkIsActive(item: NavigationItemWithChildren, path: string): boolean {
	return item.children.some((child) => {
		return isNavigationItem(child) ? child.link === path : checkIsActive(child, path);
	});
}
