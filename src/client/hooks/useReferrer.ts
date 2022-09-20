import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const REFERRER = 'referrer';

function useReferrer(): void {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('referrer', router.pathname);
  }, [router.pathname]);
}

export default useReferrer;
