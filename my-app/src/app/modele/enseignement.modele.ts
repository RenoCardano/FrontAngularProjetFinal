export interface Cours{
  idCours: number,
  nomCour: string,
  heure_debut: string,
  heure_fin: string,
  classe: Classe,
  enseignement: Enseignement,
  salleClasse: SalleClasse,
  jourCours: Jour;
}
