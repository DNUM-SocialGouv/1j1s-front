export interface MetierCode {
	toString(): string;
}

export class MetierCodeRome implements MetierCode {
	constructor(public codeRomes: string[]) {}

	public toString(): string {
		return this.codeRomes.toString();
	}
}

export class MetierCodeAppellation implements MetierCode {
	constructor(public code: string) {}

	public toString(): string {
		return this.code;
	}
}
