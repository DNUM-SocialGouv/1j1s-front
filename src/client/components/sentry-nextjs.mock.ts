import * as Sentry from '@sentry/nextjs';

const mockedCaptureMessage = jest.fn();
const mockedGetCurrentScope = jest.fn();

jest.mock('@sentry/nextjs', () => {
	const sentry = jest.requireActual('@sentry/nextjs');
	return ({
		...sentry,
		captureMessage: mockedCaptureMessage,
		getCurrentScope: mockedGetCurrentScope,
	});
});

export function mockCaptureMessage(mockFunction: jest.Mock) {
	mockedCaptureMessage.mockImplementation(mockFunction);
}

export function mockGetCurrentScope(overrides: Partial<Sentry.Scope>) {
	mockedGetCurrentScope.mockImplementation(() => {
		return {
			setTag: jest.fn(),
			...overrides,
		};
	});
}
