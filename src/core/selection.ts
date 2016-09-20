import {Predicate} from "../utils/functional/predicate";
import {Modifier} from "../utils/functional/modifier";
export class Selection<T> {

    private _elements: Array<T>;

    constructor(...elements: Array<T>) {
        this._elements = elements;
    }

    public first(): T;
    public first(): any {
        return this._elements[0] || null;
    }

    public last(): T;
    public last(): any {
        return this._elements[this._elements.length - 1] || null;
    }

    public add(element: T): Selection<T> {
        this._elements.push(element);
        return this;
    }

    public range(from: number, to: number): Selection<T> {
        const _from = from >= 0 && from || 0;
        const _to = (this._elements.length - 1 >= to && to || this._elements.length - 1) + 1;
        return new Selection<T>(...this._elements.slice(_from, _to));
    }

    public array(): Array<T>{
      return this._elements.splice(0);
    }

    public modify(modifier: Modifier<T>): Selection<T> {
        for (let i = 0; i < this._elements.length; ++i) {
            this._elements[i] = modifier(this._elements[i]);
        }
        return this;
    }

    public reduce(condition: Predicate<T>) {
        this._elements = this._elements.filter(condition);
        return this;
    }
}
