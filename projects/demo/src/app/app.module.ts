import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxResponsiveElementsModule } from '../../../ngx-responsive-elements/src/lib/ngx-responsive-elements.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxResponsiveElementsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
