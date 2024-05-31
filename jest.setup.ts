import { loadEnvConfig } from '@next/env';
import { URL } from 'url';

// @ts-expect-error : Node's version of URL is close enough to the WHATWG's version (https://github.com/jsdom/jsdom/issues/1721)
global.URL = URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
};
