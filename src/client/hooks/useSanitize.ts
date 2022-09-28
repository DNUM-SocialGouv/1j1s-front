import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

export default function useSanitize(dirty: string | undefined) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    if (dirty) {
      const transformed = replaceCarriageReturn(dirty);
      setSanitized(DOMPurify.sanitize(transformed));
    }
  }, [dirty]);

  return sanitized;
}

function replaceCarriageReturn(initial: string) {
  return initial.trim().replaceAll('\n', '<br />');
}
