import { NextApiRequest, NextApiResponse } from 'next';

import { Article } from '~/server/articles/domain/article';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function consulterArticleHandler(req: NextApiRequest, res: NextApiResponse<Article>) {
  const id = req.query.id as string;
  const article = await dependencies.articleDependencies.consulterArticle.handle(id);
  if (!article) res.status(404);
  else return res.status(200).json(article);
}

export default monitoringHandler(consulterArticleHandler);
