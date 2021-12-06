import { Ability } from "./ability";
import { Skill } from "./skill";
import { Status } from "./status";
import { Type } from "./type";

export class PokemonDetail {
  constructor(
    private _id: number,
    private _name: string,
    private _type: Array<Type>,
    private _ability: Array<Ability>,
    private _skill: Array<Skill>,
    private _status: Status,
    private _img: string
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

  public get type(): Array<Type> {
    return this._type;
  }

  public set type(type: Array<Type>) {
    this._type = type;
  }

  public get ability(): Array<Ability> {
    return this._ability;
  }

  public set ability(ability: Array<Ability>) {
    this._ability = ability;
  }

  public get skill(): Array<Skill> {
    return this._skill;
  }

  public set skill(skill: Array<Skill>) {
    this._skill = skill;
  }

  public get status(): Status {
    return this._status;
  }

  public set status(status: Status) {
    this._status = status;
  }

  public get img(): string {
    return this._img;
  }

  public set img(img: string) {
    this._img = img;
  }
}
