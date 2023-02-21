import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { dependencies } from '~/server/start';

const getAlternanceHandler = withMonitoring(async function(req, res) {
	const alternance = await dependencies.alternanceDependencies.consulterAlternance.handle(req.query.id as string);
	return handleResponse(alternance, res);
});

export default  getAlternanceHandler;
