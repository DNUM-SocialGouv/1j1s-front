import '~/client/utils/string/string.util';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

export default function useSanitize(dirty: string | undefined) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    if (dirty) {
      setSanitized(DOMPurify.sanitize(dirty.toHtml()));
    }
  }, [dirty]);

  return sanitized;
}
