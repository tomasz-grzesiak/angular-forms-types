import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms'

export type TypedFormGroup<T> = FormGroup<{
    [P in keyof T]: TypedAbstractControl<T[P]>
}>;

export type TypedFormRecord<T> = FormRecord<TypedAbstractControl<T>>;

export type TypedFormArray<T> = FormArray<TypedAbstractControl<T>>;

export type StringRecord<T> = Record<string, T>;

type GroupOrRecord<T> = StringRecord<T> extends T
    ? T extends StringRecord<infer S>
        ? TypedFormRecord<S>
        : never
    : TypedFormGroup<T>;

type TypedAbstractControl<T, U extends T = T> = T extends Array<infer S>
    ? TypedFormArray<S>
    : [U] extends [T]
    ? T extends AbstractControl
        ? T
        : T extends number | string | Date
            ? FormControl<T>
            : GroupOrRecord<T>
    : FormControl<U>;



type FormValueObject<T> = {
    [P in keyof T]: FormValue<T[P]>;
}

type FormValueGroupOrRecord<T> = StringRecord<never> extends T
    ? T extends StringRecord<infer S>
        ? Partial<FormValueObject<S>>
        : never
    : FormValueObject<T>;




export type FormValue<T, U extends T = T> = T extends Array<infer S>
    ? FormValue<S>[]
    : [U] extends [T]
    ? T extends FormControl<infer R>
        ? R
        : T extends number | string | Date
        ? T
        : Partial<FormValueObject<T>>
    : U;

export type RawFormValue<T, U extends T = T> = T extends Array<infer S>
    ? RawFormValue<S>[]
    : [U] extends [T]
    ? T extends number | string | Date
        ? T
        : FormValueGroupOrRecord<T>
    : U;
