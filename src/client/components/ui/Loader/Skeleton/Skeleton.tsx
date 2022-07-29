import classNames from 'classnames';

import styles from '~/client/components/ui/Loader/Skeleton/Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={classNames(styles.gradient, styles.image)}></div>
        <div className={styles.companyName}>
          <div className={classNames(styles.gradient, styles.textBold)}></div>
          <div className={classNames(styles.gradient, styles.text)}></div>
        </div>
      </div>
      <div className={classNames(styles.gradient, styles.line)}></div>
      <div className={styles.tags}>
        <div className={classNames(styles.gradient, styles.tag)}></div>
        <div className={classNames(styles.gradient, styles.tag)}></div>
        <div className={classNames(styles.gradient, styles.tag)}></div>
      </div>
      <div className={classNames(styles.gradient, styles.body)}></div>
      <div className={styles.links}>
        <div className={classNames(styles.gradient, styles.link)}></div>
        <div className={classNames(styles.gradient, styles.link2)}></div>
      </div>
    </div>
  );
};
