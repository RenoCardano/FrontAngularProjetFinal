import {Jour} from "./jour.modele";
import {SalleClasse} from "./salleclasse.modele";
import {Enseignement} from "./enseignement.modele";
import {Classe} from "./classe.modele";

export interface Cours{
  idCours: number,
  nomCour: string,
  heure_debut: string,
  heure_fin: string,
  classe: any,
  enseignement: any,
  salleClasse: any,
  jourCours: any;
}
