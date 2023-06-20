import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';

export function getHtmlFromMd(markdown: string): string {
	marked.use(mangle(), gfmHeadingId());
	return marked.parse(markdown);
}
