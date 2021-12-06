export class Status {
  constructor(
    private _hp: number,
    private _attack: number,
    private _block: number,
    private _critical: number,
    private _deffence: number,
    private _speed: number
  ) {}

  public get hp(): number {
    return this._hp;
  }

  public set hp(hp: number) {
    this._hp = hp;
  }

  public get attack(): number {
    return this._attack;
  }

  public set attack(attack: number) {
    this._attack = attack;
  }

  public get block(): number {
    return this._block;
  }

  public set block(block: number) {
    this._block = block;
  }

  public get critical(): number {
    return this._critical;
  }

  public set critical(critical: number) {
    this._critical = critical;
  }

  public get deffence(): number {
    return this._deffence;
  }

  public set deffence(deffence: number) {
    this._deffence = deffence;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }
}
