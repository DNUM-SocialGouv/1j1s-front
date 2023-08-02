import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';

export function getHtmlFromMd(markdown: string ): string {
	const marked = new Marked();
	marked.use(mangle(), gfmHeadingId());
	return marked.parse(markdown);
}
