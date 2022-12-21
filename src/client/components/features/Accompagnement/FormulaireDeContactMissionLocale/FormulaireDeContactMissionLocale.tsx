import React, { FormEvent, PropsWithChildren, useState } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { TextArea } from '~/client/components/ui/TextArea/TextArea';
import { ageOptions } from '~/client/domain/selectAgeData';

import styles from './FormulaireDeContactMissionLocale.module.scss';

interface FormulaireMissionLocaleProps {
  setIsSuccess: (value: boolean) => void;
}



export function FormulaireDeContactMissionLocale({ setIsSuccess }: PropsWithChildren<FormulaireMissionLocaleProps>) {
  const [inputAge, setInputAge] = useState('');

  const [inputCodePostal, setInputCodePostal] = useState('');
  const [inputVille, setInputVille] = useState('');

  async function envoyerFormulaire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    // En attendant d'avoir le service d'envoi...
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const donnéesÀEnvoyer = {
      age: Number(data.get('age')),
      codePostal: inputCodePostal,
      email: String(data.get('mail')),
      nom: String(data.get('lastname')),
      prénom: String(data.get('firstname')),
      téléphone: String(data.get('phone')),
      ville: inputVille,
    };
    setIsSuccess(true);
  }

  return (
    <form
      className={styles.formulaire}
      onSubmit={envoyerFormulaire}
    >
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
        label="Adresse e-mail (facultatif)"
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
      <TextArea
        id="commentaires"
        label="Vous avez la possibilité de nous faire part de vos commentaires ou toute autres informations que vous jugeriez utiles (facultatif)"
        placeholder="Saisissez votre texte ici..."
        name="commentaires"
        className={styles.formulaireTextArea}
      />
      <ButtonComponent className={styles.formulaireValidateButton} label='Envoyer mes informations afin d‘être rappelé(e)'/>
      <div className={styles.formulaireDécharge}>
        <p>
          Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à votre demande. Pour en savoir plus
          vous pouvez consulter la <Link href={'/confidentialite'}>politique de confidentialité</Link> et les <Link href={'/cgu'}>CGU</Link> de la DGEFP. En cliquant sur &quot;Envoyer mes informations&quot; vos données seront transmises
          à la mission locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous.
        </p>
      </div>
    </form>
  );
}
