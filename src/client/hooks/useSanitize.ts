import DOMPurify from 'dompurify';
import { useMemo } from 'react';

export default function useSanitize(dirty: string | undefined | null): string {
	return useMemo(() => {
		if (!dirty) return '';
		if (typeof window === 'undefined') return dirty;
		return DOMPurify.sanitize(dirty);
	}, [dirty]);
}
