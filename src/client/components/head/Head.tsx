import NextHead from 'next/head';
import React from 'react';

interface HeadProps {
	description?: string;
	robots: 'noindex' | 'index,follow';
  title: string;
}

export function Head({ children, robots, title }: React.PropsWithChildren<HeadProps>) {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name="robots" content={robots} />
			{children}
		</NextHead>
	);
}
