import React from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TextArea } from '~/client/components/ui/TextArea/TextArea';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';

import styles from './FormulaireDeContact.module.scss';

export interface FormulaireDeContactProps {
  isOpen: boolean
  close: (...args: unknown[]) => unknown
}

export default function FormulaireDeContact({ isOpen, close }: FormulaireDeContactProps) {

  return (
    <ModalComponent closeLabel='' isOpen={isOpen} close={close} className={styles.modal}>
      <ModalComponent.Title className={styles.modalTitle}>
        <div>Contactez-nous</div>
        <div>
          (Tous les champs sont obligatoires)
        </div>
      </ModalComponent.Title>
      <ModalComponent.Content className={styles.modalContent}>
        <form>
          <div className={styles.formulaireDeRappel}>
            <TextInput
              label="Prénom"
              name="firstname"
              autoFocus
              placeholder="Exemple : Marc, Sonia…"
              required
            />
            <TextInput
              label="Nom"
              name="lastname"
              placeholder="Exemple : Ducourt, Marie"
              required
            />
            <TextInput
              type="email"
              label="Adresse email"
              name="mail"
              placeholder="Exemple : mail@exemple.com"
              required
            />
            <TextInput
              type="tel"
              pattern="^(\+33|0|0033)[1-9]\d{8}$"
              label="Téléphone"
              name="phone"
              placeholder="Exemple : 0199999999"
              required
            />
          </div>
          <TextInput
            className={styles.sujet}
            label="Sujet"
            name="sujet"
            placeholder="Exemple : Demande de contact"
            required
          />
          <TextArea
            className={styles.textArea}
            label="Message"
            name="message"
            placeholder="Indiquez plus de détails sur votre demande"
            required
          />
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
