import { Title } from '@dataesr/react-dsfr';

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
      <p className="fr-text--bold">{explanationText}</p>
      <p>{solutionText}</p>
    </div>
  );
};
