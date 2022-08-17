import range from 'just-range';
import { FormEvent, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Option, Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';

const ageOptions: Option[] = range(16,31).map((age) => {
  return {
    libellé: `${age} ans`,
    valeur: `${age}`,
  };
});
export default function FormulaireDeContact ({ onSuccess }: { onSuccess: () => void }) {
  const [inputAge, setInputAge] = useState('');
  const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');

  async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    await demandeDeContactService.envoyer({
      age: Number(data.get('age')),
      email: data.get('mail'),
      nom: data.get('lastname'),
      prénom: data.get('firstname'),
      téléphone: data.get('phone'),
      ville: data.get('ville'),
    });
  }
  return (
    <form
      onSubmit={envoyerFormulaireDeContact}
    >
      <div className={styles.formulaireDeRappel}>
        <TextInput 
          label='Prénom'
          name='firstname'
          autoFocus
          placeholder='Exemple : Jean'
          required
        />
        <TextInput 
          label='Nom'
          name='lastname'
          placeholder='Exemple : Dupont'
          required
        />
        <TextInput
          type="email"
          label='Adresse email'
          name='mail'
          placeholder='Exemple : jean.dupont@gmail.com'
          required
        />
        <TextInput
          type="tel"
          pattern="^(\+33|0|0033)[1-9]\d{8}$"
          label='Téléphone'
          name='phone'
          placeholder='Exemple : 0606060606'
          required
        />
        <Select
          label='Age'
          name="age"
          optionList={ageOptions}
          onChange={setInputAge}
          value={inputAge}
        />
        <TextInput
          label='Ville'
          name='ville'
          placeholder='Exemple : Paris'
          required
        />
      </div>
      <Checkbox label={'J\'accepte de recevoir des informations de « 1 Jeune, 1 Solution »'} className={styles.formulaireDeRappelCheckbox}/>
      <div className={styles.formulaireDeRappelButton}>
        <Button buttonType="primary">Envoyer la demande</Button>
      </div>
    </form>
  );
}
