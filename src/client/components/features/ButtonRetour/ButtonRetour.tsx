import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { REFERRER } from '~/client/hooks/useReferrer';

export function ButtonRetour({ className }: React.HTMLProps<HTMLButtonElement>) {
  const router = useRouter();

  const referrer = useMemo( () => {
    return sessionStorage.getItem(REFERRER);
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(REFERRER);
    };
  }, []);

  return (
    <>
      {
        referrer !== null &&
        <ButtonComponent
          appearance="secondary"
          aria-label={`Retour vers la page ${referrer}`}
          className={className}
          icon={<Icon name="angle-left" />}
          iconPosition="left"
          label="Retour"
          onClick={() => router.back()}
        />
      }
    </>
  );
}
