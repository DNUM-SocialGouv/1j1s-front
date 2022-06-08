import { marked } from 'marked';

export function parseMarkdown(content: string): string {
  if (!content) {
    return '';
  }
  return marked.parse(content);
}
