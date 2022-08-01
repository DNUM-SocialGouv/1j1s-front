import classNames from 'classnames';
import React from 'react';

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

  function card() {
    return (
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
    );
  }


  function tag() {
    return <div className={classNames(styles.gradient, styles.tag)}/>;
  }

  function line() {
    return (
      <div className={classNames(styles.gradient, styles.text )}></div>
    );
  }

  function skeletonRender(type: SkeletonType, repeat: number) {
    let skeleton: React.ReactElement;

    if (type == 'card')
      skeleton = card();
    else if (type == 'tag')
      skeleton = tag();
    else if (type == 'line')
      skeleton = line();
    else
      return <></>;

    return (
      <>
        {
          [...Array(repeat)].map((x, index) => (
            <li key={index}>{skeleton}</li>
          ))
        }
      </>
    );
  }


  if (isLoading) {
    return (
      <ul
        tabIndex={0}
        role="progressbar"
        aria-busy="true"
        aria-valuemin={0}
        aria-valuemax={100}
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
