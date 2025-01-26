import { Observable } from "rxjs";

export class Personne {
    public id: number = 0;
    public nom : string = "";
    public prenom : string = "";
    public dateNaissance : string = "";
    public age : number = 0;
    public emploiActuel : string = "";
    public afficher : boolean = true;
    public emplois : Emploi[] = [];

    constructor(){}

    public static calculerAge(personne : Personne) {
        let anniversaire = new Date (personne.dateNaissance);
        let timeDiff = Math.abs(Date.now() - anniversaire.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    }
}

export class Emploi {
    public nomEntreprise : string = "";
    public encoreEnPoste : boolean = false ;
    public posteOccupe : string = "";
    public dateDebut : string = "";
    public dateFin : string = "";
    public personneId : number = 0;

    constructor() {}
}
