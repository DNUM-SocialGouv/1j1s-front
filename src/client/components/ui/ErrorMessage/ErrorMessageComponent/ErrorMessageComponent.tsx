import { Title } from '@dataesr/react-dsfr';

interface ErrorMessageProps {
  className?: string,
  explanationText: string,
  solutionText?: string,
  title: string
  dataTestId?: string
}

export const ErrorMessageComponent = (props: ErrorMessageProps) => {
  const { className, explanationText, solutionText, title, dataTestId } = props;
  return (
    <div className={className} data-testid={dataTestId}>
      <Title as="h1" look="h4">{title}</Title>
      <p className="fr-text--bold">{explanationText}</p>
      <p>{solutionText}</p>
    </div>
  );
};
