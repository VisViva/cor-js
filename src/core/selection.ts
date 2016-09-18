export class Selection<T> {
    constructor(...elements: Array<T>) {
        this._elements = elements;
    }

    private _elements: Array<T>;

    public first(): T;
    public first(): any {
        return this._elements[0] || null;
    }

    public last(): T;
    public last(): any {
        return this._elements[this._elements.length - 1] || null;
    }

    public range(from: number, to: number): Selection<T> {
        const _from = from >= 0 && from || 0;
        const _to = (this._elements.length - 1 >= to && to || this._elements.length - 1) + 1;
        return new Selection<T>(...(this._elements.slice(_from, _to)));
    }

    public array(): Array<T>{
      return this._elements.splice(0);
    }

    public modify(modifier: (element: T) => T): Selection<T> {
        for (let i = 0; i < this._elements.length; ++i) {
            this._elements[i] = modifier(this._elements[i]);
        }
        return this;
    }
}
