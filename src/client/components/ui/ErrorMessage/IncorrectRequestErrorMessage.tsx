import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const IncorrectRequestErrorMessage = (props: { className: string }) => {
  const { className } = props;
  return (
    <ErrorMessageComponent className={className}
      title="Erreur - Demande incorrecte"
      explanationText="Votre navigateur a envoyé une demande que ce serveur n’a pas pu comprendre." />
  );
};


