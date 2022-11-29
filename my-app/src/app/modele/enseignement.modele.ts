import {Enseignant} from "./enseignant.modele";
import {Matiere} from "./matiere.modele";

export interface Enseignement{
  idEnseignement: number,
  enseignant: Enseignant,
  matiereEnseignee: Matiere
}
