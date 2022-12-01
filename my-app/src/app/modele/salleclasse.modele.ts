import {Etablissement} from "./etablissement.modele";

export interface SalleClasse{
  idSalleClasse: number,
  nom?: string,
  capacite?: number,
  etablissement?: Etablissement,
  coursListSalle?: any
}
