import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const NoResultErrorMessage = () => {
  return (
    <ErrorMessageComponent
      title="0 résultat"
      explanationText="Malheureusement, aucune offre ne correspond à votre recherche !"
      solutionText="Vérifiez l‘orthographe, essayez d‘autres mots-clés ou élargissez votre zone géographique de recherche." />
  );
};


