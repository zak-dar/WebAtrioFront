import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith } from 'rxjs';
import { Emploi, Personne } from 'src/app/models';
import { PersonneService } from 'src/app/services/personne-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
private route = inject(ActivatedRoute);
private router = inject(Router);

public emploi = new Emploi()
public personne = new Personne();

  constructor(private personneService : PersonneService) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.emploi.personneId = params['id'];
    });
    this.personneService.find(this.emploi.personneId).subscribe(res => {
      this.personne = res;
    })
  }

  public save(){ 
    if(this.controlerEmploisExistants()) 
      {
        if(this.emploi.nomEntreprise != "" && this.emploi.dateDebut != "" && this.emploi.posteOccupe != ""
              && (this.emploi.encoreEnPoste == true || this.emploi.dateFin != ""))     
              {
                this.personneService.createEmploi(this.emploi).subscribe((res)=>{
                this.router.navigate(['']);
                });
              } else {
                alert('Informations erronées')
              }
      }
    
  }

  public controlerEmploisExistants() : boolean {
    let bool = true;
    this.personne.emplois.forEach(emploiExistant => {

      if(bool) {
        let dateDebutExistant = new Date(emploiExistant.dateDebut);
        let dateFinExistant = new Date(emploiExistant.dateFin);
        let dateDebutNouveau = new Date(this.emploi.dateDebut);
        let dateFinNouveau = new Date(this.emploi.dateFin);

        if(dateDebutNouveau > dateFinNouveau) {
          alert("Attention ! Les dates ne sont pas cohérentes");
          bool = false;
        }

        if((dateDebutNouveau < dateDebutExistant && dateDebutNouveau < dateFinExistant && dateFinNouveau > dateDebutExistant && dateFinNouveau < dateFinExistant) || 
          (dateDebutNouveau < dateDebutExistant && dateDebutNouveau < dateFinExistant && dateFinNouveau > dateDebutExistant && dateFinNouveau > dateFinExistant) ||
          (dateDebutNouveau > dateDebutExistant && dateDebutNouveau < dateFinExistant && dateFinNouveau > dateDebutExistant && dateFinExistant > dateDebutExistant)) 
        {
          alert("Attentions, les dates saisies ne sont aps compatibles avec les dates des emplois déjà existants, vous étiez déjà en poste pendant cette période !");
          bool = false;
          return
        }
      }
      
    }) 
    return bool;
  }

  public retour() : void {
      this.router.navigate(['']);    
  }
}
