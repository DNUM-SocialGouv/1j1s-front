import { FormEvent, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { AgeJeune } from '~/server/contrat-engagement-jeune/domain/ageCEJ';

export default function FormulaireDeContact () {
  const [inputAge, setInputAge] = useState('');
  const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');

  async function enregistrerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await demandeDeContactService.envoyer({
      age: 18,
      email: 'toto@msn.fr',
      nom: 'Mc Totface',
      prénom: 'Toto',
      téléphone: '0678954',
      ville: 'Cergy',
    });
  }
  return (
    <form
      onSubmit={enregistrerFormulaireDeContact}
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
          name="ageList"
          optionList={AgeJeune.AGE}
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
