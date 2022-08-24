import React, { FormEvent, useState } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { SpinnerIcon } from '~/client/components/ui/Icon/spinner.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TextArea } from '~/client/components/ui/Text/TextArea';
import { TextInput } from '~/client/components/ui/Text/TextInput';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';

import styles from './FormulaireDeContactEntreprise.module.scss';

export interface FormulaireDeContactProps {
  isOpen: boolean
  close: (...args: unknown[]) => unknown
}

export default function FormulaireDeContactEntreprise({ isOpen, close }: FormulaireDeContactProps) {
  const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');
  const [isLoading, setIsLoading] = useState(false);
  const [envoyé, setEnvoyé] = useState(false);

  async function envoyerDemandeDeContactEntreprise(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const data = new FormData(form);
    setIsLoading(true);
    const response = await demandeDeContactService.envoyerPourLesEntreprisesSEngagent({
      email: data.get('email'),
      message: data.get('message'),
      nom: data.get('nom'),
      prénom: data.get('prénom'),
      sujet: data.get('sujet'),
      téléphone: data.get('téléphone'),

    });
    setIsLoading(false);

    if(isSuccess(response)) {
      setEnvoyé(true);
    } else {
      alert("Erreur dans l'envoi du formulaire :" + response.errorType);
    }
  }

  return (
    <ModalComponent closeLabel='' isOpen={isOpen} close={close} className={styles.modal}>
      {
        !envoyé && <>
          <ModalComponent.Title className={styles.modalTitle}>
            <div>Contactez-nous</div>
            <div>
              (Tous les champs sont obligatoires)
            </div>
          </ModalComponent.Title>
          <ModalComponent.Content className={styles.modalContent}>
            <form
              onSubmit={envoyerDemandeDeContactEntreprise}
            >
              <div className={styles.formulaireDeRappel}>
                <TextInput
                  label="Prénom"
                  name="prénom"
                  autoFocus
                  placeholder="Exemple : Marc, Sonia…"
                  required
                />
                <TextInput
                  label="Nom"
                  name="nom"
                  placeholder="Exemple : Ducourt, Marie"
                  required
                />
                <TextInput
                  type="email"
                  label="Adresse email"
                  name="email"
                  placeholder="Exemple : mail@exemple.com"
                  required
                />
                <TextInput
                  type="tel"
                  pattern="^(\+33|0|0033)[1-9]\d{8}$"
                  label="Téléphone"
                  name="téléphone"
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
                { isLoading
                  ? (<Button disabled buttonType="primary"><SpinnerIcon /></Button>)
                  : (<Button buttonType="primary">Envoyer la demande</Button>)
                }
              </div>
              <div className={styles.décharge}>
                <p>Un traitement de données à caractère personnel est mis en œuvre par la Direction Générale de l&apos;Emploi et de la Formation Professionnelle (DGEFP), à partir des données collectées dans le formulaire ci-dessus. En cliquant sur &quot;Envoyer la demande&quot;, vos données seront utilisées pour traiter votre demande. <Link href="/confidentialite">En savoir plus sur la gestion de vos données et vos droits</Link></p>
              </div>
            </form>
          </ModalComponent.Content>
        </>
      }
      {
        envoyé && <>
          <ModalComponent.Title className={styles.modalTitle}>
            <div>Votre demande a bien été transmise !</div>
          </ModalComponent.Title>
          <ModalComponent.Content>
            <div className={ styles.success }>
              <span>
                <CheckIcon circled={ true } animate />
              </span>
              <Button onClick={close} buttonType="primary" title="Revenir à la page">Fermer</Button>
            </div>
          </ModalComponent.Content>
        </>
      }

    </ModalComponent>
  );
}
