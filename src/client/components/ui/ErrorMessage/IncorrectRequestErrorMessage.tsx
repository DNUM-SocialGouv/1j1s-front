import { ErrorMessageComponent } from '~/client/components/ui/ErrorMessage/ErrorMessageComponent/ErrorMessageComponent';

export const IncorrectRequestErrorMessage = () => {
  return (
    <ErrorMessageComponent
      title="Erreur - Demande incorrecte"
      explanationText="Votre navigateur a envoyé une demande que ce serveur n’a pas pu comprendre." />
  );
};


