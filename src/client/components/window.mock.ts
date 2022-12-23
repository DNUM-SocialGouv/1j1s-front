import Mock = jest.Mock

export function mockSmallScreen() {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    writable: true,
  });
}

export function mockLargeScreen() {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matches: true,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    writable: true,
  });
}

export function mockGetElementById() {
  Object.defineProperty(document, 'getElementById', {
    value: jest.fn().mockImplementation((id) =>({
      id,
      offsetLeft: 10,
      offsetTop: 10,
    })),
    writable: true,
  });
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function mockScrollTo(scrollTo: Mock<any, any>) {
  Object.defineProperty(window, 'scrollTo', {
    value: scrollTo,
  });
}
