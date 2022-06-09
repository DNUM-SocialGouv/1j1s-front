import { marked } from 'marked';

export function parseMarkdown(content: string): string {
  return marked.parse(content);
}
