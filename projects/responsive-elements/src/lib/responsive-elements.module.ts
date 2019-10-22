import { NgModule } from '@angular/core';
import { ResponsiveElementsComponent } from './responsive-elements.component';
import { ResponsiveElementDirective } from './responsive-element.directive';

@NgModule({
    declarations: [ResponsiveElementsComponent, ResponsiveElementDirective],
    imports: [],
    exports: [ResponsiveElementsComponent, ResponsiveElementDirective],
})
export class ResponsiveElementsModule {}
