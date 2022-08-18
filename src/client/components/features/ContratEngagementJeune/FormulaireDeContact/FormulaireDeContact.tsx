import range from 'just-range';
import Image from 'next/image';
import check from 'public/images/CEJ/check.handwriting.jpg';
import { FormEvent, PropsWithChildren, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Option, Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';

const ageOptions: Option[] = range(16,31).map((age) => {
  return {
    libellé: `${age} ans`,
    valeur: `${age}`,
  };
});

interface FormulaireDeContactProps {
  onSuccess?: () => void
}

export default function FormulaireDeContact ({ children, onSuccess }: PropsWithChildren<FormulaireDeContactProps>) {
  const [inputAge, setInputAge] = useState('');
  const [envoyé, setEnvoyé] = useState(false);
  const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');

  async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    const response = await demandeDeContactService.envoyer({
      age: Number(data.get('age')),
      email: data.get('mail'),
      nom: data.get('lastname'),
      prénom: data.get('firstname'),
      téléphone: data.get('phone'),
      ville: data.get('ville'),
    });

    if(isSuccess(response)) {
      if (onSuccess) {
        setEnvoyé(true);
        onSuccess();
      }
    } else {
      alert("Erreur dans l'envoi du formulaire :" + response.errorType);
    }
  }

  if (envoyé) {
    return (
      <div className={ styles.success }>
        <Image src={check} alt="" width="220" height="200"/>
        <h3>Votre demande a bien été transmise !</h3>
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
      <div className={styles.décharge}>
        <p>En cliquant sur &quot;Envoyer la demande&quot;, j&apos;accepte d&apos;être recontacté par Pôle Emploi ou la Mission Locale la plus proche de chez moi, dans le cadre du Contrat d&apos;Engagement Jeune</p>
      </div>
    </form>
  );
}
