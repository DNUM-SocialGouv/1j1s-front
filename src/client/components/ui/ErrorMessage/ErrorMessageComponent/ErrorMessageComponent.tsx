import { Title } from '@dataesr/react-dsfr';

import styles from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent.module.css';

interface ErrorMessageProps {
  className?: string,
  explanationText: string,
  solutionText?: string,
  title: string
}

export const ErrorMessageComponent = (props: ErrorMessageProps) => {
  const { className, explanationText, solutionText, title } = props;
  return (
    <div className={className}>
      <Title as="h2">{title}</Title>
      <p className={styles.explanationText}>{explanationText}</p>
      <p className={styles.solutionText}>{solutionText}</p>
    </div>
  );
};
