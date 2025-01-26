import { Component, Input, OnInit } from '@angular/core';
import { Personne, Emploi } from '../../models';
import { Observable } from 'rxjs';
import { PersonneService } from 'src/app/services/personne-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  personnes : Personne[] = [];
  personnesTMP : Personne[] = [];
  entreprises : string[] = [];
  selected : string = "";
  dateDebutSelected : string = ""
  dateFinSelected : string = ""

  constructor(private personneService : PersonneService, private router : Router) {
    this.get();
   }

  ngOnInit(): void {
  }



  public get() {
    this.personnes = [];

      this.personneService.load().subscribe(res =>{
        this.personnes = res;
        this.verifierAge();
        this.caculerEmploiActuel();
        this.chargerEntreprises();
        this.ajouterAfficher();
      });
  }

  public ajouterEmploi(id:any){
    this.router.navigate(['edit/'+id]);
  }

  public ajouterPersonne() : void {
    this.router.navigate(['formulairePersonne']);
  }

  public ajouterAfficher() : void {
    this.personnes.forEach(pers =>{
      pers.afficher = true;
    })
  }

  public verifierAge() :void {
    this.personnes.forEach(personne => {
      personne.age = Personne.calculerAge(personne)
    });
  }

  public caculerEmploiActuel() : void {
    this.personnes.forEach(personne => {
      personne.emplois.forEach(emploi => {
        if (emploi.encoreEnPoste == true) {
          personne.emploiActuel = emploi.posteOccupe + " chez " + emploi.nomEntreprise
        }
      })
    })
  }

  public chargerEntreprises() : void {
    this.entreprises = []
    this.personnes.forEach(personne => {
      personne.emplois.forEach(emploi => {
        if(this.entreprises.indexOf(emploi.nomEntreprise) == -1 && emploi.nomEntreprise != "") {
        this.entreprises.push(emploi.nomEntreprise);
        }
      })
    })
  }

  public filtrerEntreprise() : void {  
    this.personnesTMP = this.personnes;
    this.personnes = []          
      this.personnesTMP.forEach(pers =>{
        pers.emplois.forEach(emploi =>{
          if(emploi.nomEntreprise == this.selected || this.selected == "") {
            pers.afficher = true;
          } else{
            pers.afficher = false;
          }
        })   
        this.personnes.push(pers)   
      })
  }


  public filtrerDate() : void {
    this.personnes.forEach(pers => {
      if(pers.emplois.length > 0)
      {
        pers.emplois.forEach(emploiExistant =>{
  
          let dateDebutExistant = new Date(emploiExistant.dateDebut);
          let dateFinExistant = new Date(emploiExistant.dateFin);
          let dateDebutNouveau = new Date(this.dateDebutSelected);
          let dateFinNouveau = new Date(this.dateFinSelected);
  
          if(this.dateDebutSelected == "") {
            dateDebutNouveau = new Date(1900,1,1);
          }
          if(this.dateFinSelected == "") {
            dateFinNouveau = new Date(2099,1,1)
          }
  
          if(dateDebutNouveau > dateFinNouveau) {
            alert("Attention ! Les dates ne sont pas cohérentes");
            this.dateDebutSelected = "";
            this.dateFinSelected = "";
          }
          else if((dateDebutNouveau <= dateDebutExistant && dateDebutNouveau <= dateFinExistant && dateFinNouveau >= dateDebutExistant && dateFinNouveau <= dateFinExistant) ||
          (dateDebutNouveau <= dateDebutExistant && dateDebutNouveau <= dateFinExistant && dateFinNouveau >= dateDebutExistant && dateFinNouveau >= dateFinExistant) ||
          (dateDebutNouveau >= dateDebutExistant && dateDebutNouveau <= dateFinExistant && dateFinNouveau >= dateDebutExistant && dateFinExistant >= dateDebutExistant) ||
          (dateDebutNouveau >= dateDebutExistant && dateDebutNouveau <= dateFinExistant && dateFinNouveau >= dateDebutExistant && dateFinExistant <= dateDebutExistant))
          {
            pers.afficher = true;
          } 
          else {
            pers.afficher = false;            
          } 
      })      
    }
    else 
    {
      pers.afficher = false;
    }
    })
  }

  public resetFiltres() : void {
    this.dateDebutSelected = "";
    this.dateFinSelected = "";
    this.selected = "";

    this.filtrerDate();
    this.filtrerEntreprise();
  }
  
}
