import { loadEnvConfig } from '@next/env';

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
};
