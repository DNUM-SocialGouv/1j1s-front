import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Loader/Skeleton/Skeleton.module.scss';

interface SkeletonProps extends CommonProps {
  type: SkeletonType,
  repeat?: number,
  isLoading: boolean,
  children: React.ReactElement,
}

type SkeletonType = 'card' | 'tag' | 'line';


export const Skeleton = (props: SkeletonProps) => {
  const { type, repeat = 1, isLoading, children, className } = props;

  const card = useMemo(() =>
    (
      <div className={styles.card}>
        <div className={classNames(styles.cardImage)}></div>
        <div className={classNames(styles.cardTextBold)}></div>
        <div className={classNames(styles.cardText)}></div>

        <div className={classNames(styles.cardLine)}></div>

        <div className={classNames(styles.cardTag1)}></div>
        <div className={classNames(styles.cardTag2)}></div>
        <div className={classNames(styles.cardTag3)}></div>

        <div className={classNames(styles.cardContent)}></div>

        <div className={classNames(styles.cardLinkLabel)}></div>
        <div className={classNames(styles.cardLinkIcon)}></div>
      </div>
    ), []);

  const tag = useMemo(() => (
    <div className={classNames(styles.gradient, styles.tag)}/>
  ), []);

  const line = useMemo(() => (
    <div className={classNames(styles.gradient, styles.text )}></div>
  ), []);

  const getSkeleton = useMemo(() => {
    switch (type) {
      case 'card':
        return card;
      case 'line':
        return line;
      case 'tag':
        return tag;
      default:
        return <></>;
    }
  }, [card, line, tag]);

  const skeletonRender = useCallback((type: SkeletonType, repeat: number) => {
    return (
      <>
        {
          [...Array(repeat)].map((x, index) => (
            <li key={index}>{getSkeleton}</li>
          ))
        }
      </>
    );
  }, []);


  if (isLoading) {
    return (
      <ul
        tabIndex={0}
        aria-valuetext="...En cours de chargement"
        className={classNames(styles.wrapper, className)}
      >
        {skeletonRender(type, repeat)}
      </ul>
    );
  }
  return (
    <>
      {
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            className: classNames(child.props.className, className),
          }),
        )
      }
    </>
  );
};
