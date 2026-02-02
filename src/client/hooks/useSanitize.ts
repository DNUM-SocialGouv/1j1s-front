import DOMPurify from 'dompurify';
import { useMemo } from 'react';

export default function useSanitize(dirty: string | undefined | null) {
	return useMemo(() => dirty ? DOMPurify.sanitize(dirty) : '', [dirty]);
}
