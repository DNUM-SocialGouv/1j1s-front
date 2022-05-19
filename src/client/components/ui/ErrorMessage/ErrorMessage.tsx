import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import styles from '~/client/components/ui/ErrorMessage/ErrorMessage.module.css';

export const ErrorMessage = (props: { title: string, explanationText: string, solutionText: string }) => {
  const { title, explanationText, solutionText } = props;
  return (
    <div>
      <Title as="h2">{title}</Title>
      <p className={styles.explanationText}>{explanationText}</p>
      <p className={styles.solutionText}>{solutionText}</p>
    </div>
  );
};
