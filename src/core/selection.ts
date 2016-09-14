export class Selection<T> {
    constructor(...elements: Array<T>) {
        this._elements = new Array<T>();
        for (let i: number = 0; i < elements.length; ++i) {
            this._elements.push(elements[i]);
        }
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
        let elements: Array<T> = new Array<T>();
        for (let i: number = ((from >= 0 && from) || 0); i <= ((this._elements.length - 1 >= to && to) || (this._elements.length - 1)); ++i) {
            elements.push(this._elements[i]);
        }
        return new Selection<T>(...elements);
    }

    public array(): Array<T>{
      let elements: Array<T> = new Array<T>();
      for (let i: number = 0; i < this._elements.length ; ++i) {
          elements.push(this._elements[i]);
      }
      return elements;
    }

    public modify(modifier: (element: T) => T): Selection<T> {
        for (let i = 0; i < this._elements.length; ++i) {
            this._elements[i] = modifier(this._elements[i]);
        }
        return this;
    }
}
