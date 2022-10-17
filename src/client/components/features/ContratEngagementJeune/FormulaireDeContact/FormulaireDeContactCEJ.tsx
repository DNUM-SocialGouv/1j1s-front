import range from 'just-range';
import React, { FormEvent, PropsWithChildren, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactCEJ.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { SpinnerIcon } from '~/client/components/ui/Icon/spinner.icon';
import { Option, Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';

const ageOptions: Option[] = range(16, 31).map((age) => {
  return {
    libellé: `${age} ans`,
    valeur: `${age}`,
  };
});

interface FormulaireDeContactCEJProps {
  onSuccess?: () => void;
}

export default function FormulaireDeContactCEJ({ children, onSuccess }: PropsWithChildren<FormulaireDeContactCEJProps>) {
  const [inputAge, setInputAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [envoyé, setEnvoyé] = useState(false);
  const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');
  const [inputVille, setInputVille] = useState('');
  const [inputCodePostal, setInputCodePostal] = useState('');

  async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    setIsLoading(true);
    const response = await demandeDeContactService.envoyerPourLeCEJ({
      age: Number(data.get('age')),
      codePostal: inputCodePostal,
      email: String(data.get('mail')),
      nom: String(data.get('lastname')),
      prénom: String(data.get('firstname')),
      téléphone: String(data.get('phone')),
      ville: inputVille,
    });
    setIsLoading(false);

    if (isSuccess(response)) {
      if (onSuccess) {
        setEnvoyé(true);
        onSuccess();
      }
    } else {
      alert('Erreur dans l\'envoi du formulaire :' + response.errorType);
    }
  }

  if (envoyé) {
    return (
      <div className={styles.success}>
        <CheckIcon circled={true} animate className={styles.successIcon} />
        <h1 id="dialog_label_success">Votre demande a bien été transmise !</h1>
        {children}
      </div>
    );
  }

  return (
    <form
      onSubmit={envoyerFormulaireDeContact}
    >
      <div className={styles.formulaireDeRappel}>
        <InputText
          label="Prénom"
          name="firstname"
          autoFocus
          placeholder="Exemple : Jean"
          required
        />
        <InputText
          label="Nom"
          name="lastname"
          placeholder="Exemple : Dupont"
          required
        />
        <InputText
          type="email"
          label="Adresse email"
          name="mail"
          placeholder="Exemple : jean.dupont@gmail.com"
          required
        />
        <InputText
          type="tel"
          pattern="^(\+33|0|0033)[1-9]\d{8}$"
          label="Téléphone"
          name="phone"
          placeholder="Exemple : 0606060606"
          required
        />
        <Select
          required
          label="Age"
          name="age"
          optionList={ageOptions}
          onChange={setInputAge}
          value={inputAge}
        />
        <InputAutocomplétionCommune
          required
          id="autocomplete-commune"
          label="Ville"
          name="ville"
          placeholder="Exemple: Paris, Béziers..."
          onSuggestionSelected={(event, suggestion) => {
            setInputCodePostal(suggestion.codePostal);
            setInputVille(suggestion.nom);
          }}
        />
      </div>
      <div className={styles.formulaireDeRappelButton}>
        {isLoading
          ? (<Button disabled buttonType="primary"><SpinnerIcon/></Button>)
          : (<Button buttonType="primary">Envoyer la demande</Button>)
        }

      </div>
      <div className={styles.décharge}>
        <p>
          Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les transférer à Pôle Emploi.
          Pour en savoir plus vous pouvez consulter la <a href={'/confidentialite'}>politique de confidentialité</a> et les <a
            href={'/cgu'}>CGU</a> de la DGEFP
        </p>
      </div>
    </form>
  );
}
