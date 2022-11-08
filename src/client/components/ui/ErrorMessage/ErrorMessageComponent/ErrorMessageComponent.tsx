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
      <p>{title}</p>
      <p className="bold">{explanationText}</p>
      <p>{solutionText}</p>
    </div>
  );
};
