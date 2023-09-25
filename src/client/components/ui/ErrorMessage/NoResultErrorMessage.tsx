import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

interface NoResultErrorMessageProps {
	title?: string
	explanationText?: string
	solutionText?:string
}

export function NoResultErrorMessage(props: NoResultErrorMessageProps) {
	return (
		<ErrorMessageComponent
			title={props.title ?? '0 résultat'}
			explanationText={props.explanationText ?? 'Malheureusement, aucune offre ne correspond à votre recherche !'}
			solutionText={props.solutionText ?? 'Vérifiez l‘orthographe, essayez d‘autres mots-clés ou élargissez votre zone géographique de recherche.'}/>
	);
};


