import markdownit from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

export function getHtmlFromMd(markdown: string): string {
	const md = markdownit({
		html: true,
		linkify: true,
	});
	md.use(markdownItAnchor, { tabIndex: false });

	const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

	md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
		tokens[idx].attrSet('target', '_blank');
		return defaultRender(tokens, idx, options, env, self);
	};

	return md.render(markdown);
}
