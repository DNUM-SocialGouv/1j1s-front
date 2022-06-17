import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const UnavailableServiceErrorMessage = (props: { className: string }) => {
  const { className } = props;
  return (
    <ErrorMessageComponent className={className}
      title="Service indisponible"
      explanationText="Désolé, le service est temporairement inaccessible, la page demandée ne peut pas être affichée."
      solutionText="Merci de réessayer plus tard, vous serez bientôt en mesure de réutiliser le service. Si vous avez besoin d’une aide immédiate, merci de nous contacter." />
  );
};


