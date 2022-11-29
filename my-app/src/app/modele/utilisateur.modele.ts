import {Etablissement} from "./etablissement.modele";

export interface Utilisateur{
  id: number,
  login: string,
  motdepasse: number,
  etablissement: Etablissement
}
