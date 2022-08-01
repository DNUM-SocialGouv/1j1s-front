import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Loader/Skeleton/Skeleton.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface SkeletonProps extends CommonProps {
  type: SkeletonType,
  repeat?: number,
  isLoading: boolean,
  children: React.ReactElement,
}

type SkeletonType = 'card' | 'tag' | 'line';


export const Skeleton = (props: SkeletonProps) => {
  const { type, repeat = 1, isLoading, children, className } = props;
  const { isSmallScreen } = useBreakpoint();

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
            {line()}
            {line()}
          </div>
        ) }
        <div className={styles.cardLink}>
          <div className={classNames(styles.gradient, styles.cardLinkLabel)}></div>
          <div className={classNames(styles.gradient, styles.cardLinkIcon)}></div>
        </div>
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

  function tag() {
    return <div className={classNames(styles.tag)}/>;
  }

  function line() {
    return (
      <div className={classNames(styles.gradient, styles.text, isSmallScreen ? styles.textShort : styles.textLong)}></div>
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

    // return skeleton;
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
        aria-valuemin="0"
        aria-valuemax="100"
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
