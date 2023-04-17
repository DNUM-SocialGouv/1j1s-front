import pino from 'pino';
import { createWriteStream, Severity } from 'pino-sentry';

import packageInfo from '~/../package.json';
import { SentryException } from '~/server/exceptions/sentryException';

import { LoggerService } from './logger.service';

const { name, version } = packageInfo;
const RELEASE_NAME_SUFFIX = 'server';

// STEP 1 - Utiliser pino dans le LoggerService (= implique de supprimer le côté statique de la class) <--- NOUS SOMMES ICI
// TODO STEP 2 - Supprimer les références à Sentry depuis l'exterieur
// TODO STEP 3 - Rajouter des logs dans le back où c'est pertinent

export class PinoLoggerService implements LoggerService {

	private logger;

	constructor(private sentryDsn: string, private sentryLogLevel: string, private environement: string) {

		const releaseName = (env: string) => {
			if(env === 'review_app') {
				return `${name}@review+${version}-${RELEASE_NAME_SUFFIX}`;
			}
			return `${name}@${version}-${RELEASE_NAME_SUFFIX}`;
		};

		const sentryConfiguration = {
			dsn: sentryDsn,
			release: releaseName(environement),
			sentryExceptionLevels: [
				Severity.Critical,
				Severity.Error,
				Severity.Fatal,
			],
		};

		const pinoSentryStream = createWriteStream({
			...sentryConfiguration,
		});

		if (process.env.NODE_ENV === 'test') {
			this.logger = pino({ level: sentryLogLevel }, pinoSentryStream);
		} else {
			this.logger = pino({ level: sentryLogLevel }, pino.multistream([pinoSentryStream, { stream: process.stdout }]));
		}
	}

	public info(msg: string) {
		this.logger.info({ msg });
	}

	public warn(msg: string) {
		this.logger.warn({ msg });
	}

	public error(msg: string) {
		this.logger.error({ msg });
	}

	public warnWithExtra(exception: SentryException) {
		this.logger.warn({
			extra: exception.extra,
			msg: exception.message,
			tags: exception.tag,
		});
	}

	public errorWithExtra(exception: SentryException) {
		this.logger.error({
			extra: exception.extra,
			msg: exception.message,
			tags: exception.tag,
		});
	}
}

