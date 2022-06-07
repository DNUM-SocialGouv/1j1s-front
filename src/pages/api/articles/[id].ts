import { NextApiRequest, NextApiResponse } from 'next';

import { Article } from '~/server/articles/domain/article';
import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function consulterArticleHandler(req: NextApiRequest, res: NextApiResponse<Article | ErrorHttpResponse>) {
  const id = req.query.id as string;
  const article = await dependencies.articleDependencies.consulterArticle.handle(id);
  if (article.instance === 'success') {
    return res.status(200).json(article.result);
  } else {
    switch (article.errorType) {
      case ErrorType.RESSOURCE_INTROUVABLE:
        return res.status(404).json({ error: article.errorType });
      case ErrorType.ERREUR_INATTENDUE:
        return res.status(500).json({ error: article.errorType });
    }
  }
  return;
}

export default monitoringHandler(consulterArticleHandler);
