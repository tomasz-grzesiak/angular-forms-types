import { FormBuilder, NonNullableFormBuilder } from "@angular/forms";
import { TypedFormGroup, StringRecord, FormValue, RawFormValue } from "./types";

type CustomName = "Alice" | "Bob";

enum LiteralEnum {
    X = "X",
    Y = "Y",
    Z = 4,
    Q = 7,
}

enum ComputedEnum {
    X = getValue(4),
    Y = getValue(5),
    Z = getValue(2),
    Q = getValue(7),
}

function getValue<T>(x: T): T {
    return x;
}

const OConstEnum = {
    X: 1,
    Y: 3,
    Z: 5,
    Q: 2 & 6,
} as const;
type ConstEnum = (typeof OConstEnum)[keyof typeof OConstEnum];

interface Book {
    string: string;
    enum: LiteralEnum;
}

interface SimplePerson {
    string: string;
    number: number;
    boolean: boolean;
    stringUnion: CustomName;
    numberUnion: 2 | 5;
    mixedUnion: string | number;
    literalEnum: LiteralEnum;
    computedEnum: ComputedEnum;
    constEnum: ConstEnum;
    date: Date;
    arrayNumber: number[];
    arrayBoolean: boolean[];
    arrayStringUnion: CustomName[];
    arrayMixedUnion: (string | number)[];
    arrayLiteralEnum: LiteralEnum[];
}

interface Person extends SimplePerson {
    optionalString?: string;
    object: Book;
    arrayObject: Book[];
    recordNumber: StringRecord<number>;
    recordBoolean: StringRecord<boolean>;
    recordStringUnion: StringRecord<CustomName>;
    recordMixedUnion: StringRecord<string | number>;
    recordLiteralEnum: StringRecord<LiteralEnum>;
    recordObject: StringRecord<Book>;
    recordOfArrayNumber: StringRecord<number[]>;
    recordOfArrayStringUnion: StringRecord<CustomName[]>;
    recordOfArrayMixedUnion: StringRecord<(string | number)[]>;
    recordOfArrayLiteralEnum: StringRecord<LiteralEnum[]>;
    recordOfArrayObject: StringRecord<Book[]>
}

interface BookNull {
    string: string | null;
    enum: LiteralEnum | null;
}

interface SimplePersonNull {
    string: string | null;
    number: number | null;
    boolean: boolean | null;
    stringUnion: CustomName | null;
    numberUnion: 2 | 5 | null;
    mixedUnion: string | number | null;
    literalEnum: LiteralEnum | null;
    computedEnum: ComputedEnum | null;
    constEnum: ConstEnum | null;
    date: Date | null;
    arrayNumber: (number | null)[];
    arrayBoolean: (boolean | null)[];
    arrayStringUnion: (CustomName | null)[];
    arrayMixedUnion: (string | number | null)[];
    arrayLiteralEnum: (LiteralEnum | null)[];
}

interface PersonNull extends SimplePersonNull {
    optionalString?: string | null;
    object: BookNull;
    arrayObject: BookNull[];
    recordNumber: StringRecord<number | null>;
    recordBoolean: StringRecord<boolean | null>;
    recordStringUnion: StringRecord<CustomName | null>;
    recordMixedUnion: StringRecord<string | number | null>;
    recordLiteralEnum: StringRecord<LiteralEnum | null>;
    recordObject: StringRecord<BookNull>;
    recordOfArrayNumber: StringRecord<(number | null)[]>;
    recordOfArrayStringUnion: StringRecord<(CustomName | null)[]>;
    recordOfArrayMixedUnion: StringRecord<(string | number | null)[]>;
    recordOfArrayLiteralEnum: StringRecord<(LiteralEnum | null)[]>;
    recordOfArrayObject: StringRecord<BookNull[]>
}

const nonNullableFB: NonNullableFormBuilder = new FormBuilder().nonNullable;
const nullableFB: FormBuilder = new FormBuilder();

function personNonNullable(): void {
    const formWithType: TypedFormGroup<Person> = nonNullableFB.group({
        string: "name",
        number: 4,
        boolean: true as boolean,
        stringUnion: "Alice" as CustomName,
        numberUnion: 2 as 2 | 5,
        mixedUnion: "retro" as string | number,
        literalEnum: LiteralEnum.X as LiteralEnum,
        computedEnum: ComputedEnum.Y,
        constEnum: OConstEnum.Z as ConstEnum,
        date: new Date(),
        object: nonNullableFB.group({
            string: "title",
            enum: LiteralEnum.Q,
        }),
        arrayNumber: nonNullableFB.array([3, 7]),
        arrayBoolean: nonNullableFB.array([false, true, true]),
        arrayStringUnion: nonNullableFB.array(["Alice", "Alice", "Bob"] as CustomName[]),
        arrayMixedUnion: nonNullableFB.array(["test", 10, "mix"]),
        arrayLiteralEnum: nonNullableFB.array([LiteralEnum.X, LiteralEnum.Y]),
        arrayObject: nonNullableFB.array([
            nonNullableFB.group({
                string: "insideArray1",
                enum: LiteralEnum.X,
            }),
        ]),
        recordNumber: nonNullableFB.record({
            value1: 8
        }),
        recordBoolean: nonNullableFB.record({
            value1: true
        }),
        recordStringUnion: nonNullableFB.record({
            value1: "Bob" as CustomName
        }),
        recordMixedUnion: nonNullableFB.record({
            value1: "value1",
            value2: 3
        }),
        recordLiteralEnum: nonNullableFB.record({
            value1: LiteralEnum.Q
        }),
        recordObject: nonNullableFB.record({
            value1: nonNullableFB.group({
                string: "insideRecord1",
                enum: LiteralEnum.Z,
            }),
        }),
        recordOfArrayNumber: nonNullableFB.record({
            value1: nonNullableFB.array([12, 4])
        }),
        recordOfArrayStringUnion: nonNullableFB.record({
            value1: nonNullableFB.array(["Alice", "Bob", "Bob"] as CustomName[])
        }),
        recordOfArrayMixedUnion: nonNullableFB.record({
            value1: nonNullableFB.array([12, "test"])
        }),
        recordOfArrayLiteralEnum: nonNullableFB.record({
            value1: nonNullableFB.array([LiteralEnum.Y, LiteralEnum.Q])
        }),
        recordOfArrayObject: nonNullableFB.record({
            value1: nonNullableFB.array([
                nonNullableFB.group({
                    string: "insideArray1OfRecord1",
                    enum: LiteralEnum.X,
                })
            ])
        }),
    });

    // FormValue<T> returns type identical with form.value
    // RawFormValue<T> return type identical with form.getRawValue()
    const value: FormValue<Person> = formWithType.value;
    const rawValue: RawFormValue<Person> = formWithType.getRawValue();

    // With form.getRawValue() you can get an empty model as long as it does not contain records containing object (indirectly or directly).
    // In cases like this you can try this hack, overriding problematic fields-records
    const valueWithoutWrapper: Person = {
        ...formWithType.getRawValue(),
        recordObject: formWithType.controls.recordObject.getRawValue(),
        recordOfArrayObject: formWithType.controls.recordOfArrayObject.getRawValue()
    }

    formWithType.addControl("random", nonNullableFB.control("newValue")); // ERROR: key "random" does not exist in model Person
    formWithType.addControl("optionalString", nonNullableFB.control("newValue"));

    formWithType.removeControl("number"); // ERROR: key "number" is not optional in model Person
    formWithType.removeControl("optionalString");

    formWithType.controls.stringUnion.setValue("Charlie"); // ERROR: "Charlie" is not assignable to type CustomName
    formWithType.controls.stringUnion.setValue(null); // ERROR: null is not assignable to type CustomName
    formWithType.controls.stringUnion.setValue("Alice")

    formWithType.controls.arrayMixedUnion.push(nonNullableFB.control(true)); // ERROR: FormControl<boolean> is not assignable to type FormControl<string | number>
    formWithType.controls.arrayMixedUnion.push(nonNullableFB.control(27));

    formWithType.controls.recordObject.addControl("value3", nonNullableFB.group({
        string: false,
        enum: LiteralEnum.X as LiteralEnum
    })); // ERROR: false is not assignable to string (inside group)
    formWithType.controls.recordObject.addControl("value3", nonNullableFB.group({
        string: "name",
        enum: LiteralEnum.X as LiteralEnum
    }));

    formWithType.patchValue({
        number: null,
        constEnum: OConstEnum.Y,
        arrayMixedUnion: [23, true, "test"]
    }); // ERROR: null is not assignable to number; ERROR: boolean is not assignable to string | number
    formWithType.patchValue({
        number: 25,
        constEnum: OConstEnum.Y,
        arrayMixedUnion: [23, "title", "test"]
    });

    formWithType.reset({
        number: 25,
        constEnum: null,
        arrayMixedUnion: [23, true, "test"]
    }); // ERROR: null is not assignable to number; ERROR: boolean is not assignable to string | number
    formWithType.reset({
        number: 25,
        constEnum: OConstEnum.Y,
        arrayMixedUnion: [23, "title", "test"]
    });
}

function personNullable(): void {
    const formWithType: TypedFormGroup<PersonNull> = nullableFB.group({
        string: "name",
        number: 4,
        boolean: true as boolean,
        stringUnion: "Alice" as CustomName,
        numberUnion: 2 as 2 | 5,
        mixedUnion: "retro" as string | number,
        literalEnum: LiteralEnum.X as LiteralEnum,
        computedEnum: ComputedEnum.Y,
        constEnum: OConstEnum.Z as ConstEnum,
        date: new Date(),
        object: nullableFB.group({
            string: "title",
            enum: LiteralEnum.Q,
        }),
        arrayNumber: nullableFB.array([3, 7]),
        arrayBoolean: nullableFB.array([false, true, true]),
        arrayStringUnion: nullableFB.array(["Alice", "Alice", "Bob"] as CustomName[]),
        arrayMixedUnion: nullableFB.array(["test", 10, "mix"]),
        arrayLiteralEnum: nullableFB.array([LiteralEnum.X, LiteralEnum.Y]),
        arrayObject: nullableFB.array([
            nullableFB.group({
                string: "insideArray1",
                enum: LiteralEnum.X,
            }),
        ]),
        recordNumber: nullableFB.record({
            value1: 8
        }),
        recordBoolean: nullableFB.record({
            value1: true
        }),
        recordStringUnion: nullableFB.record({
            value1: "Bob" as CustomName
        }),
        recordMixedUnion: nullableFB.record({
            value1: "value1",
            value2: 3
        }),
        recordLiteralEnum: nullableFB.record({
            value1: LiteralEnum.Q
        }),
        recordObject: nullableFB.record({
            value1: nullableFB.group({
                string: "insideRecord1",
                enum: LiteralEnum.Z,
            }),
        }),
        recordOfArrayNumber: nullableFB.record({
            value1: nullableFB.array([12, 4])
        }),
        recordOfArrayStringUnion: nullableFB.record({
            value1: nullableFB.array(["Alice", "Bob", "Bob"] as CustomName[])
        }),
        recordOfArrayMixedUnion: nullableFB.record({
            value1: nullableFB.array([12, "test"])
        }),
        recordOfArrayLiteralEnum: nullableFB.record({
            value1: nullableFB.array([LiteralEnum.Y, LiteralEnum.Q])
        }),
        recordOfArrayObject: nullableFB.record({
            value1: nullableFB.array([
                nullableFB.group({
                    string: "insideArray1OfRecord1",
                    enum: LiteralEnum.X,
                })
            ])
        }),
    });

    // FormValue<T> returns type identical with form.value
    // RawFormValue<T> return type identical with form.getRawValue()
    const value: FormValue<PersonNull> = formWithType.value;
    const rawValue: RawFormValue<PersonNull> = formWithType.getRawValue();

    // With form.getRawValue() you can get an empty model as long as it does not contain records containing object (indirectly or directly).
    // In cases like this you can try this hack, overriding problematic fields-records
    const valueWithoutWrapper: PersonNull = {
        ...formWithType.getRawValue(),
        recordObject: formWithType.controls.recordObject.getRawValue(),
        recordOfArrayObject: formWithType.controls.recordOfArrayObject.getRawValue()
    }

    formWithType.addControl("random", nullableFB.control("newValue")); // ERROR: key "random" does not exist in model PersonNull
    formWithType.addControl("optionalString", nullableFB.control("newValue"));

    formWithType.removeControl("number"); // ERROR: key "number" is not optional in model PersonNull
    formWithType.removeControl("optionalString");

    formWithType.controls.stringUnion.setValue("Charlie"); // ERROR: "Charlie" is not assignable to type CustomName | null
    formWithType.controls.stringUnion.setValue(null); // VALID! null is assignable to type CustomName | null
    formWithType.controls.stringUnion.setValue("Alice")

    formWithType.controls.arrayMixedUnion.push(nullableFB.control(true)); // ERROR: FormControl<boolean> is not assignable to type FormControl<string | number>
    formWithType.controls.arrayMixedUnion.push(nullableFB.control(27));

    formWithType.controls.recordObject.addControl("value3", nullableFB.group({
        string: false,
        enum: LiteralEnum.X as LiteralEnum
    })); // ERROR: false is not assignable to string | null (inside group)
    formWithType.controls.recordObject.addControl("value3", nullableFB.group({
        string: "name",
        enum: LiteralEnum.X as LiteralEnum
    }));

    formWithType.patchValue({
        number: null,
        constEnum: OConstEnum.Y,
        arrayMixedUnion: [23, true, "test"]
    }); // ERROR: boolean is not assignable to string | number | null
    formWithType.patchValue({
        number: null,
        constEnum: OConstEnum.Y,
        arrayMixedUnion: [23, "title", "test"]
    }); // VALID: null is assignable to type number | null

    formWithType.reset({
        number: 25,
        constEnum: null,
        arrayMixedUnion: [23, true, "test"]
    }); // ERROR: boolean is not assignable to string | number | null
    formWithType.reset({
        number: 25,
        constEnum: null,
        arrayMixedUnion: [23, "title", "test"]
    });  // VALID: null is assignable to type number | null
}

function simplePersonNonNullable(): void {
    const formWithType: TypedFormGroup<SimplePerson> = nonNullableFB.group({
        string: "name",
        number: 4,
        boolean: true as boolean,
        stringUnion: "Alice" as CustomName,
        numberUnion: 2 as 2 | 5,
        mixedUnion: "retro" as string | number,
        literalEnum: LiteralEnum.X as LiteralEnum,
        computedEnum: ComputedEnum.Y,
        constEnum: OConstEnum.Z as ConstEnum,
        date: new Date(),
        arrayNumber: nonNullableFB.array([3, 7]),
        arrayBoolean: nonNullableFB.array([false, true, true]),
        arrayStringUnion: nonNullableFB.array(["Alice", "Alice", "Bob"] as CustomName[]),
        arrayMixedUnion: nonNullableFB.array(["test", 10, "mix"]),
        arrayLiteralEnum: nonNullableFB.array([LiteralEnum.X, LiteralEnum.Y]),
    });

    // Partial<T> works as long as there are no nested object in form model
    const value: Partial<SimplePerson> = formWithType.value;
    const rawValue: SimplePerson = formWithType.getRawValue();
}

function simplePersonNullable(): void {
    const formWithType: TypedFormGroup<SimplePersonNull> = nullableFB.group({
        string: "name",
        number: 4,
        boolean: true as boolean,
        stringUnion: "Alice" as CustomName,
        numberUnion: 2 as 2 | 5,
        mixedUnion: "retro" as string | number,
        literalEnum: LiteralEnum.X as LiteralEnum,
        computedEnum: ComputedEnum.Y,
        constEnum: OConstEnum.Z as ConstEnum,
        date: new Date(),
        arrayNumber: nullableFB.array([3, 7]),
        arrayBoolean: nullableFB.array([false, true, true]),
        arrayStringUnion: nullableFB.array(["Alice", "Alice", "Bob"] as CustomName[]),
        arrayMixedUnion: nullableFB.array(["test", 10, "mix"]),
        arrayLiteralEnum: nullableFB.array([LiteralEnum.X, LiteralEnum.Y]),
    });

    // Partial<T> works as long as there are no nested object in form model
    const value: Partial<SimplePersonNull> = formWithType.value;
    const rawValue: SimplePersonNull = formWithType.getRawValue();
}
