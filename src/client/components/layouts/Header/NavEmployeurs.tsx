import classNames from 'classnames';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import styles from '~/client/components/layouts/Header/NavEmployeurs.module.scss';
import { useExitModal } from '~/client/hooks/useExitModal';

import { Icon } from '../../ui/Icon/Icon';
import { isNavigationItem, NavigationItem, NavigationItemWithChildren } from './NavigationStructure';

interface NavEmployeursProps {
  item: NavigationItemWithChildren
  onClick?: () => void
}
export function NavEmployeurs ({ item: root }: NavEmployeursProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    function onResize() {
      if (content.current && wrapper.current) {
        const height = content.current.offsetHeight;
        wrapper.current.style.setProperty('--contentHeight', `${height}px`);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [wrapper, content]);

  
  useExitModal(wrapper, isExpanded, () => isExpanded && setIsExpanded(false));


  return (
    <li className={styles.navItem}>
      <button className={styles.navItemButton}
        onClick={(e) => {e.stopPropagation(); setIsExpanded(!isExpanded); }}
      >
        <span className={styles.navItemLabel}>{root.label}</span>
        <Icon name="angle-down" className={classNames(styles.icon, { [styles.expanded]: isExpanded })} />
      </button>
      <div ref={wrapper} className={classNames(styles.navWrapper, { [styles.expanded]: isExpanded })}>
        <ul ref={content} className={styles.navDetail}>
          { listsFromChildren(root, () => setIsExpanded(false)) }
        </ul>
      </div>
    </li>
  );
}

function listsFromChildren(item: NavigationItemWithChildren | NavigationItem, onItemChosen: () => void) {
  if (isNavigationItem(item)) {
    return (
      <li key={item.link} className={styles.navLeaf}>
        <span onClick={onItemChosen}>
          <Link href={item.link}>{item.label}</Link>
        </span>
      </li>
    );
  }
  return (
    <li key={item.label} className={ styles.navSection }>
      <span className={styles.navSectionHeader}>
        <strong className={styles.subNavTitle}>{item.label}</strong>
        { item.legend ? <em>{item.legend}</em> : ''}
      </span>
      <ul className={styles.navSectionItems}>
        {item.children.map((i) => listsFromChildren(i, onItemChosen))}
      </ul>
    </li>
  );
}
