import {Enseignant} from "./enseignant.modele";

export class Classe{
  constructor(public idClasse: number,
              public nomClasse: string,
              public professeurPrincipal?: Enseignant,
              public coursList?: any ) {}
}
