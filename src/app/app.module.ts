import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './components/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { FormulairePersonneComponent } from './components/formulaire-personne/formulaire-personne.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    FormulairePersonneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
