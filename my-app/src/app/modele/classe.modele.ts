import {Enseignant} from "./enseignant.modele";

export class Classe{
  constructor(public idClasse: number,
              public professeurPrincipal?: Enseignant,
              public coursList?: any ) {}
}
