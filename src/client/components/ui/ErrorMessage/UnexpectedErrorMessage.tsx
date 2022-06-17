import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const UnexpectedErrorMessage = (props: { className: string }) => {
  const { className } = props;
  return (
    <ErrorMessageComponent className={className}
      dataTestId="UnexpectedErrorMessage"
      title="Erreur inattendue"
      explanationText="Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement possible."
      solutionText="Essayez de rafraichir la page ou bien ressayer plus tard. Si vous avez besoin d’une aide immédiate, merci de nous contacter." />
  );
};


