import { Article } from '~/server/cms/domain/article';

export function anContenu(override?: Partial<Article>): Article {
	return {
		contenu: '<h2 id="hic-devia-socero-latiaeque-habe-foedabis-genetricis">Hic devia socero Latiaeque habe foedabis genetricis</h2>\n<p>Lorem markdownum torumque sic latet</p>\n',
		slug: 'mon-article',
		titre: 'Mon article',
		...override,
	};
}
