# Angular Forms Types
# Utility types to simplify your work with Angular Typed Forms

With Angular 14, the Angular team provided us with the ability to create strictlt typed forms, which has the potential of greatly improving developers' lifes.

Unfortunately, the set of types available in @angular/forms library is quite cumbersome when it comes to work with FormGroups as there are no provided wrapper types that can transform data model into appropriate form type. This poses quite a challenge from the perspective of providing a specific type in numerous situations, e.g. when passing such a FormGroup as an input parameter into a child component.

Following utility types may be of some help in addressing this issue.


