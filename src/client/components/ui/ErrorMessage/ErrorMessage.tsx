import { Title } from '@dataesr/react-dsfr';
import React from 'react';

import styles from '~/client/components/ui/ErrorMessage/ErrorMessage.module.css';

interface ErrorMessageProps {
  className?: string,
  explanationText: string,
  solutionText: string,
  title: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { className, explanationText, solutionText, title } = props;
  return (
    <div className={className}>
      <Title as="h2">{title}</Title>
      <p className={styles.explanationText}>{explanationText}</p>
      <p className={styles.solutionText}>{solutionText}</p>
    </div>
  );
};
