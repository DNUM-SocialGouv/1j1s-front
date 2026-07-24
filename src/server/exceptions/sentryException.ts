export type Tag = {
  context: string,
  source: string,
  status?: string,
}

export class SentryException extends Error {
	tag: Tag;
	extra: Record<string, unknown>;

	constructor(message: string, tag: Tag, extra: Record<string, unknown>) {
		super(message);
		this.tag = tag;
		this.extra = extra;
	}

}
