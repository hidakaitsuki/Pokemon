export class Skill {
  constructor(private _skillName: string, private _skillUrl: string) {}

  public get skillName(): string {
    return this._skillName;
  }

  public set skillName(skillName: string) {
    this._skillName = skillName;
  }

  public get skillUrl(): string {
    return this._skillUrl;
  }

  public set skillUrl(skillUrl: string) {
    this._skillUrl = skillUrl;
  }
}
