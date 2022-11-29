import {Enseignement} from "./enseignement.modele";

export interface Matiere{
  id: number,
  codeMat: string,
  couleur: string,
  nom: string,
  enseignement: Enseignement,
  sallesExclues: any
}
