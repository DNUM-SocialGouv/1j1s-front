import classNames from 'classnames';

import styles from '~/client/components/ui/Loader/Skeleton/Skeleton.module.scss';

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
      <div className={classNames(styles.gradient, styles.cardContent)}></div>
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
      <li className={classNames(styles.gradient, styles.tag)}></li>
      <li className={classNames(styles.gradient, styles.tag)}></li>
      <li className={classNames(styles.gradient, styles.tag)}></li>
    </ul>
  );
}

function text() {
  return (
    <div className={classNames(styles.gradient, styles.text)}></div>
  );
}

export const Skeleton = () => {
  return (
    <>
      {cardList()}
      {text()}
    </>
  );
};
