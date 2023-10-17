import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { DefaultErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API La bonne alternance',
	contexte: 'search alternance',
	message: 'impossible d’effectuer une recherche d’alternance',
});
describe('DefaultErrorManagementService', () => {
	describe('lorsque l‘erreur est une Http error', () => {
		it('qui commence par 50 doit créer une failure service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(500);
			const expectedFailure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une 404 doit créer une failure contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(404);
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une 400 doit créer une failure demande incorrecte', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(400);
			const expectedFailure = createFailure(ErreurMetier.DEMANDE_INCORRECTE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une autre erreur doit créer une failure contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(409);
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('doit envoyer les logs de l’erreur en précisant que c’est une erreur http', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const httpError = anHttpError();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const expectedLogDetails = new SentryException(
				`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpError.response?.data },
			);

			// WHEN
			errorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});

		describe('Gère la sévérité de l‘erreur', () => {
			it('lorsque la sévérité est warning doit envoyer les logs en warning', () => {
				// GIVEN
				const logInformation = aLogInformation({
					apiSource: 'API La bonne alternance',
					contexte: 'search alternance',
					message: 'impossible d’effectuer une recherche d’alternance',
					severity: Severity.WARNING,
				});
				const loggerService = aLoggerService();
				const httpError = anHttpError();
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				// WHEN
				errorManagementService.handleFailureError(httpError, logInformation);

				// THEN
				expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
			it('lorsque la sévérité est fatal doit envoyer les logs en fatal', () => {
				// GIVEN
				const logInformation = aLogInformation({
					apiSource: 'API La bonne alternance',
					contexte: 'search alternance',
					message: 'impossible d’effectuer une recherche d’alternance',
					severity: Severity.FATAL,
				});
				const loggerService = aLoggerService();
				const httpError = anHttpError();
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				// WHEN
				errorManagementService.handleFailureError(httpError, logInformation);

				// THEN
				expect(loggerService.fatalWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
			it('lorsque la sévérité est erreur doit envoyer les logs en erreur', () => {
				// GIVEN
				const logInformation = aLogInformation({
					apiSource: 'API La bonne alternance',
					contexte: 'search alternance',
					message: 'impossible d’effectuer une recherche d’alternance',
					severity: Severity.ERROR,
				});
				const loggerService = aLoggerService();
				const httpError = anHttpError();
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				// WHEN
				errorManagementService.handleFailureError(httpError, logInformation);

				// THEN
				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
			it('lorsque la sévérité n‘est pas précisée doit envoyer les logs en erreur', () => {
				// GIVEN
				const logInformation = aLogInformation({
					apiSource: 'API La bonne alternance',
					contexte: 'search alternance',
					message: 'impossible d’effectuer une recherche d’alternance',
					severity: undefined,
				});
				const loggerService = aLoggerService();
				const httpError = anHttpError();
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				// WHEN
				errorManagementService.handleFailureError(httpError, logInformation);

				// THEN
				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('doit créer une failure de contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(internalError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		describe('doit envoyer les logs de l’erreur en précisant que c’est une erreur interne', () => {
			it('avec la stack trace lorsque l‘erreur est une Error', () => {
				// GIVEN
				const loggerService = aLoggerService();
				const internalError = new Error('ceci est une erreur interne');
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ stacktrace: internalError.stack },
				);

				// WHEN
				errorManagementService.handleFailureError(internalError, logInformation);

				// THEN
				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
			it('avec le contenu entier lorsque l‘erreur n‘est pas une Error', () => {
				// GIVEN
				const loggerService = aLoggerService();
				const internalError = 'une erreur qui n‘est pas une erreur';
				const errorManagementService = new DefaultErrorManagementService(loggerService);
				const expectedLogDetails = new SentryException(
					`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
					{ context: logInformation.contexte, source: logInformation.apiSource },
					{ error: internalError },
				);

				// WHEN
				errorManagementService.handleFailureError(internalError, logInformation);

				// THEN
				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
			describe('Gère la sévérité de l‘erreur', () => {
				it('lorsque la sévérité est warning doit envoyer les logs en warning', () => {
					// GIVEN
					const logInformation = aLogInformation({
						apiSource: 'API La bonne alternance',
						contexte: 'search alternance',
						message: 'impossible d’effectuer une recherche d’alternance',
						severity: Severity.WARNING,
					});
					const loggerService = aLoggerService();
					const internalError = new Error('ceci est une erreur interne');
					const errorManagementService = new DefaultErrorManagementService(loggerService);
					const expectedLogDetails = new SentryException(
						`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
						{ context: logInformation.contexte, source: logInformation.apiSource },
						{ stacktrace: internalError.stack },
					);

					// WHEN
					errorManagementService.handleFailureError(internalError, logInformation);

					// THEN
					expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
				it('lorsque la sévérité est fatal doit envoyer les logs en fatal', () => {
					// GIVEN
					const logInformation = aLogInformation({
						apiSource: 'API La bonne alternance',
						contexte: 'search alternance',
						message: 'impossible d’effectuer une recherche d’alternance',
						severity: Severity.FATAL,
					});
					const loggerService = aLoggerService();
					const internalError = new Error('ceci est une erreur interne');
					const errorManagementService = new DefaultErrorManagementService(loggerService);
					const expectedLogDetails = new SentryException(
						`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
						{ context: logInformation.contexte, source: logInformation.apiSource },
						{ stacktrace: internalError.stack },
					);

					// WHEN
					errorManagementService.handleFailureError(internalError, logInformation);

					// THEN
					expect(loggerService.fatalWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
				it('lorsque la sévérité est erreur doit envoyer les logs en erreur', () => {
					// GIVEN
					const logInformation = aLogInformation({
						apiSource: 'API La bonne alternance',
						contexte: 'search alternance',
						message: 'impossible d’effectuer une recherche d’alternance',
						severity: Severity.ERROR,
					});
					const loggerService = aLoggerService();
					const internalError = new Error('ceci est une erreur interne');
					const errorManagementService = new DefaultErrorManagementService(loggerService);
					const expectedLogDetails = new SentryException(
						`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
						{ context: logInformation.contexte, source: logInformation.apiSource },
						{ stacktrace: internalError.stack },
					);

					// WHEN
					errorManagementService.handleFailureError(internalError, logInformation);

					// THEN
					expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
				it('lorsque la sévérité n‘est pas précisée doit envoyer les logs en erreur', () => {
					const logInformation = aLogInformation({
						apiSource: 'API La bonne alternance',
						contexte: 'search alternance',
						message: 'impossible d’effectuer une recherche d’alternance',
						severity: undefined,
					});
					// GIVEN
					const loggerService = aLoggerService();
					const internalError = new Error('ceci est une erreur interne');
					const errorManagementService = new DefaultErrorManagementService(loggerService);
					const expectedLogDetails = new SentryException(
						`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
						{ context: logInformation.contexte, source: logInformation.apiSource },
						{ stacktrace: internalError.stack },
					);

					// WHEN
					errorManagementService.handleFailureError(internalError, logInformation);

					// THEN
					expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
			});
		});
	});

	describe('lorsque l‘erreur est une erreur de validation', () => {
		it('log en warning', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const validationError = new ApiValidationError(
				[
					{
						context: {
							key: 'id',
							label: 'matchas.results[0].job.id',
							value: 1,
						},
						message: '"matchas.results[0].job.id" must be a string',
						path: ['matchas', 'results', 0, 'job', 'id'],
						type: 'string.base',
					},
				],
				{});
			// NOTE DORO 2023-10-17: Jest ne permet pas de verifier le contenu d'un objet qui extend Error, on ne peut donc pas tester errorDetail
			const expectedLogDetails = new SentryException(
				`[${logInformation.apiSource}] ${logInformation.message} (erreur de validation)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: validationError },
			);

			// WHEN
			errorManagementService.logValidationError(validationError, logInformation);

			// THEN
			expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});
	});
});
