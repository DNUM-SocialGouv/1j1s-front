import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const usePopstate = () => {
	const router = useRouter();

	useEffect(()=>{
		window.addEventListener('popstate', () => router.reload() );
		return () => window.removeEventListener('popstate', () => router.reload());
	}, [router]);
};
