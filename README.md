# NgxResponsiveElements

# Usage

## Install

```
npm i ngx-responsive-elements
```

## Include

Import the module via

```
import { NgxResponsiveElementsModule } from 'ngx-responsive-elements';
```

and add NgxResponsiveElementsModule to your module's imports

```javascript
@NgModule({
    imports: [..., NgxResponsiveElementsModule],
})
export class YourModule {}
```

## Use directive

You can use the directive on any element you want.

### sizeMap

Define a sizeMap object. The key is the lowest pixel value of the element's
width and the value is the css class that should get applied.

Example:

```javascript
const sizeMap = { 300: 'small', 500: 'medium', 700: 'large' };
```

```html
<div ngxReResponsiveElement [sizeMap]="sizeMap"></div>
```

From 300px element's width to 499px the class 'small' will be applied. From
500px element's width to 699px the class 'medium' will be applied. From 700px
element's width onwards the class 'large' will be applied.

For widths lower than 300px, the defaultCssClass will be applied.

### defaultCssClass

Define the css class your element should have when the element's size is smaller
than the smallest key in your sizeMap.

If you don't set the defaultCssClass, it defaults to 'default'.

Example:

```javascript
const defaultCssClass = 'test';
```

```html
<div ngxReResponsiveElement [defaultCssClass]="defaultCssClass"></div>
```

# ResponsiveElementsWorkspace

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
