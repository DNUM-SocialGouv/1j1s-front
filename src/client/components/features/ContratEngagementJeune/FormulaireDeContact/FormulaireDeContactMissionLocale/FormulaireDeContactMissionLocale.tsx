import React, { PropsWithChildren, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactMissionLocale/FormulaireDeContactMissionLocale.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import { Link } from '~/client/components/ui/Link/Link';
import { Option, Select } from '~/client/components/ui/Select/Select';

import { InputText } from '../../../../ui/Form/InputText/InputText';
import { CheckIcon } from '../../../../ui/Icon/check.icon';

const AGE_MINIMUM = 16;

const ageOptions: Option[] = Array.from(Array(15).keys()).map((index) => {
  const age = index + AGE_MINIMUM;
  return {
    libellé: `${age} ans`,
    valeur: `${age}`,
  };
});

interface FormulaireDeContactMissionLocaleProps {
  onSuccess?: () => void;
}

export function FormulaireDeContactMissionLocale({ children, onSuccess }: PropsWithChildren<FormulaireDeContactMissionLocaleProps>) {
  const [envoyé, setEnvoyé] = useState(false);
  const [inputAge, setInputAge] = useState('');
  // (En attendant d'envoyer la donnée)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputVille, setInputVille] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputCodePostal, setInputCodePostal] = useState('');

  async function envoyerFormulaireDeContact() {
    if (onSuccess) {
      setEnvoyé(true);
      onSuccess();
    } else {
      alert('Erreur dans l‘envoi du formulaire');
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
      <div className={styles.formulaireGrid}>
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
          label="Adresse email (facultatif)"
          name="mail"
          placeholder="Exemple : jean.dupont@gmail.com"
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
            setInputVille(suggestion.ville);
          }}
        />
      </div>
      <div className={styles.textArea}>
        <label htmlFor="Commentaires">
          Vous avez la possibilité de nous faire part de vos commentaires ou toute autres informations que vous jugeriez utiles
        </label>
        <textarea
          id="Commentaires"
          className={styles.textAreaField}
          placeholder="Saisissez votre texte ici.."
        />
      </div>
      <div className={styles.formulaireGridButton}>
        <ButtonComponent label="Envoyer mes informations afin d'être rappelé(e)" />
      </div>
      <div className={styles.décharge}>
        <p>
          Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à votre demande. Pour en savoir plus
          vous pouvez consulter <Link href={'/confidentialite'}>la politique de confidentialité</Link> et les <Link href={'/cgu'}>CGU</Link> de la DGEFP.
          En cliquant sur &quot;Envoyer mes informations&quot; vos données seront transmises
          à la mission locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous
        </p>
      </div>
    </form>
  );
}
