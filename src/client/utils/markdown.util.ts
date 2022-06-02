import { marked } from 'marked';

export function parseMarkdown(content: string) {
  return marked.parse(content);
}
