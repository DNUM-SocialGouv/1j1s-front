import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';

export function ButtonRetour({ className }: React.HTMLProps<HTMLButtonElement>) {
  const router = useRouter();
  const [isButtonRetourVisible, setIsButtonRetourVisible] = useState<boolean>(false);
  const [retour, setRetour] = useState<string>();

  useEffect(() => {
    if(router.query.from !== undefined) {
      setIsButtonRetourVisible(true);
      setRetour(router.query.from.toString());
    }
  }, [router.query.from]);

  function handleRetour() {
    if(router.query.from !== undefined) {
      if(router.query.params !== undefined) {
        return router.push(`${router.query.from.toString()}?${router.query.params.toString()}`);
      }
      return router.push(router.query.from.toString());
    }
  }

  return (
    <>
      {isButtonRetourVisible &&
        <ButtonComponent
          appearance="secondary"
          aria-label={`Retour vers ${retour}`}
          className={className}
          icon={<Icon name="angle-left" />}
          iconPosition="left"
          label="Retour"
          onClick={handleRetour}
        />
      }
    </>
  );
}
