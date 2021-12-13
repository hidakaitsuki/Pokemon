export class OrderPokemon {
  constructor(
    private _id: number,
    private _name: string,
    private _img: string,
    private _skill: Array<string>,
    private _quantity: number
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get img(): string {
    return this._img;
  }

  public set img(img: string) {
    this._img = img;
  }

  public get skill(): Array<string> {
    return this._skill;
  }

  public set skill(skill: Array<string>) {
    this._skill = skill;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }
}
