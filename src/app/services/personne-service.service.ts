import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Emploi, Personne } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  private urlApi : string = 'https://localhost:5001/api/Personne';
  private personnes: Array<Personne> = new Array<Personne>();

  constructor(private http: HttpClient) { 
    this.load();
  }

  public load() {    
    return this.http.get<Array<Personne>>(this.urlApi);
  }


  public createPersonne(personne: Personne) {    


    return this.http.post<Personne>(this.urlApi + '/CreerPersonne', {"nom" : personne.nom, "prenom" : personne.prenom, "dateNaissance" : personne.dateNaissance, "emplois" : personne.emplois})

  }

  public find(id:number) {
    return this.http.get<Personne>(this.urlApi +"/" + id);
  }

  public createEmploi(emploi:Emploi){
    return this.http.post<Emploi>(this.urlApi+'/CreerEmploi', emploi);
  }
}
