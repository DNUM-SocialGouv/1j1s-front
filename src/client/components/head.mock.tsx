import React from 'react';
import ReactDOM from 'react-dom';

// NOTE (GAFI 22-02-2023): Mock requis --> https://github.com/vercel/next.js/discussions/11060
export function HeadMock({ children }: { children: React.ReactNode }) {
	return <>{ReactDOM.createPortal(children, document.head)}</>;
}
