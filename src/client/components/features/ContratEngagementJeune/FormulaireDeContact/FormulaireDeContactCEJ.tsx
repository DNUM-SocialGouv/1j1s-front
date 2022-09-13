import range from 'just-range';
import React, { FormEvent, PropsWithChildren, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactCEJ.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { SpinnerIcon } from '~/client/components/ui/Icon/spinner.icon';
import InputAutocomplétionCommune from '~/client/components/ui/Input/InputAutocomplétion/InputAutocomplétionCommune';
import { Option, Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/Text/TextInput';
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

  async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    setIsLoading(true);
    const response = await demandeDeContactService.envoyerPourLeCEJ({
      age: Number(data.get('age')),
      email: String(data.get('mail')),
      nom: String(data.get('lastname')),
      prénom: String(data.get('firstname')),
      téléphone: String(data.get('phone')),
      ville: String(data.get('ville')),
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
        <span>
          <CheckIcon circled={true} animate/>
        </span>
        <h1>Votre demande a bien été transmise !</h1>
        {children}
      </div>
    );
  }

  return (
    <form
      onSubmit={envoyerFormulaireDeContact}
    >
      <div className={styles.formulaireDeRappel}>
        <TextInput
          label="Prénom"
          name="firstname"
          autoFocus
          placeholder="Exemple : Jean"
          required
        />
        <TextInput
          label="Nom"
          name="lastname"
          placeholder="Exemple : Dupont"
          required
        />
        <TextInput
          type="email"
          label="Adresse email"
          name="mail"
          placeholder="Exemple : jean.dupont@gmail.com"
          required
        />
        <TextInput
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
          label="Ville"
          name="ville"
          placeholder="Exemple: Paris, Béziers..."
        />
      </div>
      <div className={styles.formulaireDeRappelButton}>
        {isLoading
          ? (<Button disabled buttonType="primary"><SpinnerIcon/></Button>)
          : (<Button buttonType="primary">Envoyer la demande</Button>)
        }

      </div>
      <div className={styles.décharge}>
        <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche
          de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
      </div>
    </form>
  );
}
