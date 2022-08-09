import { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { AgeJeune } from '~/server/contrat-engagement-jeune/domain/ageCEJ';

export default function FormulaireDeContact () {
  const [inputAge, setInputAge] = useState('');
  return (
    <form>
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
          closeOnSelect={true}
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
        <Button
          buttonType="primary"
        >
                Envoyer la demande
        </Button>
      </div>
      <div className={styles.formulaireDeRappelText}>
        <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
      </div>
    </form>
  );
}
