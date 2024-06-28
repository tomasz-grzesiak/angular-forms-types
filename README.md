# Angular Forms Types
## Why

With Angular 14, the Angular team provided us with the ability to create strictlt typed forms, which has the potential of greatly improving developers' lifes.

Unfortunately, the set of types available in @angular/forms library is quite cumbersome when it comes to work with FormGroups as there are no provided wrapper types that can transform data model into appropriate form type. This poses quite a challenge from the perspective of providing a specific type in numerous situations, e.g. when passing such a FormGroup as an input parameter into a child component.

Following utility types may be of some help in addressing this issue.

## TypedFormGroup\<T>

`TypedFormGroup` creates a `FormGroup` iterating iterates over properties of given type, changing the type of every property to the appropriate form type.\
`TypedFromGroup` expects object to be passed as a generic type.

While iterating over properties:
- Basic types (`number`, `string`, `boolean`), enums, union types and `Date`(!) are mapped to `FormControl` of that type.
- Arrays are mapped to `FormArray`. Type of the array elements is further mapped into form types, according to the same principles.
- `StringRecord` is mapped to `FormRecord`, with its properties mapped accordingly. It is necessary to use `StringRecord` in your data model to obtain `FormRecord` in the final form model.
- Other object types are mapped to `FormGroup`. Same as with arrays, properties of the object type are further mapped. WARNING! As mentioned, `Date` type is not mapped to `FormGroup`, due to its usage in date pickers it end up as `FormControl<Date>`.

## TypedFormArray\<T>

`TypedFormArray` creates a `FormArray` with internal type created according to the rules described for `TypedFormGroup`.

## TypedFormRecord\<T>

`TypedFormRecord` created `FormRecord` with internal type created according to the rules described for `TypedFormGroup`.

## StringRecord\<T>

`StringRecord` is a helper type tu use when creating forms that use `FormRecord`s. Its usage is described in the `TypedFormGroup` section. 
