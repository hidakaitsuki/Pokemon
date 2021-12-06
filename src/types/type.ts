export class Type {
  constructor(private _typeName: string, private _typeUrl: string) {}

  public get typeName(): string {
    return this._typeName;
  }

  public set typeName(typeName: string) {
    this._typeName = typeName;
  }

  public get typeUrl(): string {
    return this._typeUrl;
  }

  public set typeUrl(typeUrl: string) {
    this._typeUrl = typeUrl;
  }
}
