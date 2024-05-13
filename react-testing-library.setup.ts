import '@testing-library/jest-dom/jest-globals';

jest.mock('next/dynamic', () => ({
	__esModule: true,
	default: (...props: never[]) => {
		const dynamicModule = jest.requireActual('next/dynamic');
		const dynamicActualComp = dynamicModule.default;
		const RequiredComponent = dynamicActualComp(props[0]);
		RequiredComponent.preload
			? RequiredComponent.preload()
			: RequiredComponent.render.preload();
		return RequiredComponent;
	},
}));

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation((...args) => {
		throw new Error(`console.error called with : ${args}`);
	});
	jest.spyOn(console, 'warn').mockImplementation((...args) => {
		throw new Error(`console.warn called with : ${args}`);
	});
});
