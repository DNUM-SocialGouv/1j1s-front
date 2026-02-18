import type { ConfigData, Message } from 'html-validate';
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeAccessible(): Promise<void>
    toHTMLValidate(filename?: string): T;
    toHTMLValidate(config: ConfigData, filename?: string): T;
    toHTMLValidate(error: Partial<Message>, filename?: string): T;
    toHTMLValidate(error: Partial<Message>, config: ConfigData, filename?: string): T;
  }
}
