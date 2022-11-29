import {Enseignement} from "./enseignement.modele";

export interface Enseignant{
  idEns: number,
  nom: string,
  dateDeNaissance: any,
  enseignement: Enseignement,
}
