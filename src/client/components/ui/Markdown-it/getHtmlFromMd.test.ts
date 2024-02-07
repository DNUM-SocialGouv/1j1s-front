import { getHtmlFromMd } from '~/client/components/ui/Markdown-it/getHtmlFromMd';

describe('getHtmlFromMd', () => {
	it('transforme le markdown en HMTL', () => {
		const markdown = '# je suis le titre\n **Je suis le paragraphe en gras**';
		const result = getHtmlFromMd(markdown);
		expect(result).toBe('<h1>je suis le titre</h1>\n<p><strong>Je suis le paragraphe en gras</strong></p>\n');
	});

	it('transforme les liens en liens s‘ouvrant dans un nouvel onglet', () => {
		const markdown = '[example de lien](https://example.com)';
		const result = getHtmlFromMd(markdown);
		expect(result).toBe('<p><a href="https://example.com" target="_blank">example de lien</a></p>\n');
	});

	it('transforme les email en mailto', () => {
		const markdown = 'email@example.com';
		const result = getHtmlFromMd(markdown);
		expect(result).toBe('<p><a href="mailto:email@example.com" target="_blank">email@example.com</a></p>\n');
	});
});
