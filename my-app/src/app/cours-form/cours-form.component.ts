import {Component, OnInit} from '@angular/core';
import {CoursService} from "../service/cours.service";
import {Cours} from "../modele/cours.modele";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../modele/classe.modele";

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit{

  ourform!: FormGroup;
  cours: Cours[]  = [];
  size!: number;
  nomTest!: string | undefined;
  display = "none";

  constructor(private cs: CoursService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ourform! = this.fb.group({
      idCours: [],
      nomCour: [, Validators.required],
      heure_debut: [, Validators.required],
      heure_fin: [, Validators.required],
      classe: [],
      enseignement: [],
      salleClasse: [],
      jourCours: [],
    });
    this.cs.findAll().subscribe(maliste => {this.cours = maliste; this.size = maliste.length; console.log("NIQUE TA GRAND MAMAN !!!!")});
    console.log(this.cours.at(0)?.nomCour);
    this.nomTest = this.cours.at(0)?.nomCour;

  }


  addCours() {
    console.log(this.ourform!.value);
    const formValues = this.ourform!.value;
    const cours = {
      idCours: 0,
      nomCour: formValues.nomCour,
      heure_debut: formValues.heure_debut,
      heure_fin: formValues.heure_fin,
      classe: {},
      enseignement: {},
      salleClasse: {},
      jourCours: {}
    };
    console.log(cours);
    this.cs.add(cours);
    this.coursToString(cours);
    this.ourform!.reset();
  }

  coursToString(cours: Cours){
    return `
            Nom: ${cours.nomCour}
            Heure de début: ${cours.heure_debut}
            Heure de fin: ${cours.heure_fin}`
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
