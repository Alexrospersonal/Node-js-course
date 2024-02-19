type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

type AnyButtonType = DialogButtonType | FormButton["type"];

type ConfirmationHandlingFormButton = FormButton & {
    onConfirm?: (param: DialogButtonType) => void
}

let btn1: AnyButtonType = "Yes";
let btn2: AnyButtonType = "Add";
let btn3: AnyButtonType = "Remove";
let btn4: ConfirmationHandlingFormButton = {
    type: "Add",
    onConfirm: (param) => { }
}
let btn5: ConfirmationHandlingFormButton = {
    type: "Add"
}


interface SumObject {
    [key: string]: { cvalue?: string | number | SumObject } | undefined
}

function summ(a: SumObject) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === "undefined") return 2022;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || +'2022';
        if (typeof elem.cvalue === "number") return elem.cvalue
        if (typeof elem.cvalue === "object") return summ(elem.cvalue);
        return elem.cvalue;
    });

    let sum = 0;

    for (let i = 0; i < x.length; i++) {
        sum += x[i] as number;
    }
    return sum;
}


let a: SumObject = { hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "2" } } } };

// console.log(summ(a));

type MapFunction<T> = (value: T) => any;

function mapObject<T, U>(obj: Record<string, T>, func: MapFunction<T>): Record<string, U> {
    const result: Record<string, U> = {} as Record<string, U>;

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            result[key] = func(value);
        }
    }

    return result;
}

const oldObject = {
    roma: 5,
    vasya: 2
}

const labmda = (x: any) => x > 2;

// const newObject = mapObject(oldObject, (x) => x > 2);
// console.log(newObject);

type PartialData<T> = Partial<T>;
type PartialDataWithId<T> = PartialData<T> & { id?: string };

type EnhanceFunction<T> = (partial: PartialData<T>) => T;
type EnhanceFunctionWithId<T> = (partial: PartialDataWithId<T>) => T;

type ClassType<T> = new () => T;

function createSomeClasses<T>(someClass: ClassType<T>, count: number): T[] {
    const arr: T[] = [];

    for (let i = 0; i < count; i++) {
        arr.push(new someClass());
    }

    return arr;
}

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

let aClasses: Rectangle[] = createSomeClasses(Rectangle, 10);
let bClasses: Circle[] = createSomeClasses(Circle, 20)