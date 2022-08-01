import classNames from 'classnames';

import styles from '~/client/components/ui/Loader/Skeleton/Skeleton.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';



export const Skeleton = () => {
  const { isSmallScreen } = useBreakpoint();
  // ajouter une propriété au skeleton pour render le composant adéquat
  // implémenter la logique du render ici
  
  function card() {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={classNames(styles.gradient, styles.cardImage)}></div>
          <div>
            <div className={classNames(styles.gradient, styles.textBold)}></div>
            <div className={classNames(styles.gradient, styles.text)}></div>
          </div>
        </div>
        {tagList()}
        { isSmallScreen && <div className={classNames(styles.gradient, styles.cardContent)}></div> }
        { !isSmallScreen && (
          <div>
            {text()}
            {text()}
          </div>
        ) }
        <div className={styles.cardLink}>
          <div className={classNames(styles.gradient, styles.cardLinkLabel)}></div>
          <div className={classNames(styles.gradient, styles.cardLinkIcon)}></div>
        </div>
      </div>
    );
  }

  function cardList() {
    return (
      <div>
        {card()}
        {card()}
        {card()}
      </div>
    );
  }

  function tagList() {
    return (
      <ul className={styles.tagList}>
        <li className={classNames(styles.tag)}></li>
        <li className={classNames(styles.tag)}></li>
        <li className={classNames(styles.tag)}></li>
      </ul>
    );
  }

  function text() {
    return (
      <div className={classNames(styles.gradient, styles.text, isSmallScreen ? styles.textShort : styles.textLong)}></div>
    );
  }

  return (
    <div
      tabIndex="0"
      role="progressbar"
      aria-busy="true"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext="...En cours de chargement"
      className={styles.wrapper}
    >
      {cardList() }
    </div>
  );
};
