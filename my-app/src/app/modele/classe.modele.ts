import {Enseignant} from "./enseignant.modele";

export interface Cours{
  idClasse: number,
  professeurPrincipal: Enseignant,
  coursList: any
}
