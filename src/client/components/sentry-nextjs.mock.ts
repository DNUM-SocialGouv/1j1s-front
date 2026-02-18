import { type Mock } from 'vitest';

import * as Sentry from '@sentry/nextjs';

const mockedCaptureMessage = vi.fn();
const mockedGetCurrentScope = vi.fn();

vi.mock('@sentry/nextjs', () => {
	const sentry = vi.importActual('@sentry/nextjs');
	return ({
		...sentry,
		captureMessage: mockedCaptureMessage,
		getCurrentScope: mockedGetCurrentScope,
	});
});

export function mockCaptureMessage(mockFunction: Mock) {
	mockedCaptureMessage.mockImplementation(mockFunction);
}

export function mockGetCurrentScope(overrides: Partial<Sentry.Scope>) {
	mockedGetCurrentScope.mockImplementation(() => {
		return {
			setTag: vi.fn(),
			...overrides,
		};
	});
}
