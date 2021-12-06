export class Ability {
  constructor(private _abilityName: string, private _abilityUrl: string) {}

  public get abilityName(): string {
    return this._abilityName;
  }

  public set abilityName(abilityName: string) {
    this._abilityName = abilityName;
  }

  public get abilityUrl(): string {
    return this._abilityUrl;
  }

  public set abilityUrl(abilityUrl: string) {
    this._abilityUrl = abilityUrl;
  }
}
