import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules:
import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';

// Components:
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CounterModule,
    HeroesModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }