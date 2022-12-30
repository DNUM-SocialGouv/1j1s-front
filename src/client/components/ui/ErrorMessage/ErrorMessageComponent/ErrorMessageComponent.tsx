import styles from '~/client/components/ui/ErrorMessage/ErrorMessage.module.scss';

interface ErrorMessageProps {
  explanationText: string,
  solutionText?: string,
  title: string
}

export const ErrorMessageComponent = (props: ErrorMessageProps) => {
	const { explanationText, solutionText, title } = props;
	return (
		<p className={styles.errorMessage}>
			<strong className={styles.errorMessageTitle}>{title}</strong>
			<span className="bold">{explanationText}</span>
			{solutionText && <span>{solutionText}</span>}
		</p>
	);
};
