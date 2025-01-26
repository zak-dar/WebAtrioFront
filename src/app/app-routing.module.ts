import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { FormulairePersonneComponent } from './components/formulaire-personne/formulaire-personne.component';

const routes: Routes = [
  { path : "" , component : HomeComponent },
  { path : "edit/:id"  , component : EditComponent },
  { path : "formulairePersonne" , component : FormulairePersonneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
