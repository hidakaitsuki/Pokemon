export class Item {
  constructor(private _name: string, private _effect: string) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get effect(): string {
    return this._effect;
  }

  public set effect(effect: string) {
    this._effect = effect;
  }
}
