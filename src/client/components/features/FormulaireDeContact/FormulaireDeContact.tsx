import { Dispatch, SetStateAction } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';

import styles from './FormulaireDeContact.module.scss';

export interface FormulaireDeContactProps<b> {
  isOpenState: [b, Dispatch<SetStateAction<b>>]
}

export default function FormulaireDeContact({ isOpenState }: FormulaireDeContactProps<boolean>) {
  const [isOpen, setIsOpen] = isOpenState;

  return (
    <ModalComponent closeLabel='' close={() => setIsOpen(false)} isOpen={isOpen} className={styles.modal}>
      <ModalComponent.Title className={styles.modalTitle}>
        Demande de contact
      </ModalComponent.Title>
      <ModalComponent.Content className={styles.modalContent}>
        <form>
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
          </div>
          <TextInput
            className={styles.sujet}
            label="Sujet"
            name="sujet"
            placeholder="Exemple : Dupont"
            required
          />
          <div className={styles.textArea}>
            <label>Message</label>
            <br />
            <textarea className={styles.textAreaInput} name="message"></textarea>
          </div>
          <div className={styles.formulaireDeRappelButton}>
            <Button buttonType="primary">Envoyer la demande</Button>
          </div>
          <div className={styles.décharge}>
            <p>Un traitement de données à caractère personnel est mis en œuvre par la Direction Générale de l&apos;Emploi et de la Formation Professionnelle (DGEFP), à partir des données collectées dans le formulaire ci-dessus. En cliquant sur &quot;Envoyer la demande&quot;, vos données seront utilisées pour traiter votre demande. <Link href="/confidentialite">En savoir plus sur la gestion de vos données et vos droits</Link></p>
          </div>
        </form>
      </ModalComponent.Content>
    </ModalComponent>
  );
}
