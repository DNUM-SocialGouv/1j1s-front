import '@testing-library/jest-dom/vitest';

vi.mock('next/image', () => {
	return {
		__esModule: true,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		default: (props: any) => {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const React = require('react');
			const { fill, priority, quality, loader, placeholder, blurDataURL, unoptimized, ...imgProps } = props;
			const src = typeof props.src === 'object' ? props.src.src : props.src;
			return React.createElement('img', { ...imgProps, src });
		},
	};
});

vi.mock('next/dynamic', () => {
	return {
		__esModule: true,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		default: (loader: () => Promise<any>) => {
			let Comp: React.ComponentType | null = null;
			const loadPromise = loader().then((mod: { default?: React.ComponentType }) => {
				Comp = mod && typeof mod === 'object' && 'default' in mod ? mod.default! : (mod as unknown as React.ComponentType);
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(globalThis as any).__dynamicPromises = (globalThis as any).__dynamicPromises || [];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(globalThis as any).__dynamicPromises.push(loadPromise);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			function DynamicMock(props: any) {
				if (!Comp) return null;
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				const React = require('react');
				return React.createElement(Comp, props);
			}
			DynamicMock.displayName = 'LoadableComponent';
			return DynamicMock;
		},
	};
});

beforeEach(async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	await Promise.all((globalThis as any).__dynamicPromises || []);

	vi.spyOn(console, 'error').mockImplementation((...args) => {
		throw new Error(`console.error called with : ${args}`);
	});
	vi.spyOn(console, 'warn').mockImplementation((...args) => {
		throw new Error(`console.warn called with : ${args}`);
	});
});
