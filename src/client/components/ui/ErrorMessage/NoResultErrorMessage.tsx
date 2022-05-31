import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const NoResultErrorMessage = (props: { className: string }) => {
  const { className } = props;
  return (
    <ErrorMessageComponent className={className}
      title="0 résultat"
      explanationText="Malheureusement, aucune offre ne correspond à votre recherche !"
      solutionText="Vérifiez l&apos;orthographe, essayez d&apos;autres mots-clés ou élargissez votre zone géographique de recherche." />
  );
};


