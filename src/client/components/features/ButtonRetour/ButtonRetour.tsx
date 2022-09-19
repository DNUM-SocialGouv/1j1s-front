import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

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
        <Button
          className={className}
          buttonType="secondary" 
          onClick={handleRetour} 
          aria-label={`Retour vers ${retour}`} 
          icon={<AngleLeftIcon />}>
          <span>Retour</span>
        </Button>
      }
    </>
  );
}
