const CODE_INSEE_SEPARATEUR = '_';

export class CodeInsee {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  get valueQuandMultipleCodesPostaux() {
    const splitValue = this._value.split(CODE_INSEE_SEPARATEUR);
    return splitValue.length > 1 ? this._value.split(CODE_INSEE_SEPARATEUR)[1] : this._value;
  }

  get valueAvecCodePostal() {
    return this._value.split(CODE_INSEE_SEPARATEUR)[0];
  }

  static createCodeInseeAvecCodePostal(value: string, codePostal: string) {
    return new CodeInsee(value + CODE_INSEE_SEPARATEUR + codePostal);
  }

  static createCodeInsee(value: string) {
    return new CodeInsee(value);
  }
}
