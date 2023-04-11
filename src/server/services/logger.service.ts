import pino from 'pino';
import { createWriteStream, Severity } from 'pino-sentry';

import packageInfo from '~/../package.json';
import { SentryException } from '~/server/exceptions/sentryException';


const { name, version } = packageInfo;

export interface Logger { //TODO typer plus specifiquement en vue d'une exposition du logger
	debug(...args: Array<unknown>): void;
	error(...args: Array<unknown>): void;
	fatal(...args: Array<unknown>): void;
	info(...args: Array<unknown>): void;
	trace(...args: Array<unknown>): void;
	warn(...args: Array<unknown>): void;
}

// STEP 1 - Utiliser pino dans le LoggerService (= implique de supprimer le côté statique de la class) <--- NOUS SOMMES ICI
// TODO STEP 2 - Supprimer les références à Sentry depuis l'exterieur
// TODO STEP 3 - Rajouter des logs dans le back où c'est pertinent

export interface LoggerService {
	info(msg: string): void
	warn(msg: string): void
	error(msg: string): void
	warnWithExtra(exception: SentryException): void
	errorWithExtra(exception: SentryException): void
}


//TODO sortir cette classe dans son propre fichier
export class PinoLoggerService implements LoggerService {

	private logger: Logger;

	constructor(private sentryDsn: string, private sentryLogLevel: string) { //TODO typing plus specifique pour le log Level?

		const sentryConfiguration = {
			dsn: sentryDsn,
			level: Severity.Error,
			release: name.concat('@').concat(version), //TODO check doc
			sentryExceptionLevels: [ // TODO check doc
				Severity.Critical,
				Severity.Error,
				Severity.Fatal,
			],
		};

		const pinoSentryStream = createWriteStream({
			...sentryConfiguration,
		});

		//todo voir si d'une condition sur la creation du logger est nécessaire ou si remove
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

