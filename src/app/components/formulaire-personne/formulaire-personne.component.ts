import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personne } from 'src/app/models';
import { PersonneService } from 'src/app/services/personne-service.service';

@Component({
  selector: 'app-formulaire-personne',
  templateUrl: './formulaire-personne.component.html',
  styleUrls: ['./formulaire-personne.component.css']
})
export class FormulairePersonneComponent implements OnInit {

  personne : Personne = new Personne();

  private router = inject(Router);

  constructor(private personneService : PersonneService) { }

  ngOnInit(): void {
  }

  public save(){
    if(this.personne.nom != "" && this.personne.prenom != "" && this.personne.dateNaissance != "" && Personne.calculerAge(this.personne) < 150)     
      {
        this.personneService.createPersonne(this.personne).subscribe((res)=>{
        this.router.navigate(['']);
        });
      } else {
        alert('Informations erronées ou age supérieur à 150 ans')
      }
  }

  
  public retour() : void {
    this.router.navigate(['']);    
  }
}
