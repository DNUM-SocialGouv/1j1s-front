export interface MetierCode {
	toString(): string;
}

export class MetierCodeRome implements MetierCode {
	constructor(public code: string) {}

	public toString(): string {
		return this.code;
	}
}

export class MetierCodeAppellation implements MetierCode {
	constructor(public code: string) {}

	public toString(): string {
		return this.code;
	}
}
