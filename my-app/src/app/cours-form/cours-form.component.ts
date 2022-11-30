import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CoursService} from "../service/cours.service";
import {Cours} from "../modele/cours.modele";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})

export class CoursFormComponent implements OnInit{

  @ViewChild('content', { static: true }) modalContent!: ElementRef;
  static coursObj: Cours;
  ourform!: FormGroup;
  cours: Cours[]  = [];
  size!: number;
  nomTest!: string | undefined;
  display = "none";
  modalReference!: NgbModalRef;

  constructor(private cs: CoursService, private fb: FormBuilder, private modalService: NgbModal) { }

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
    CoursFormComponent.coursObj = {
      idCours: 0,
      nomCour: formValues.nomCour,
      heure_debut: formValues.heure_debut,
      heure_fin: formValues.heure_fin,
      classe: {},
      enseignement: {},
      salleClasse: {},
      jourCours: {}
    };
    console.log("ADDING   " + CoursFormComponent.coursToString(CoursFormComponent.coursObj));
    this.cs.add(CoursFormComponent.coursObj);
    this.ourform!.reset();
  }

  static coursToString(cours: Cours){
    return `
            Nom: ${cours.nomCour}
            Heure de début: ${cours.heure_debut}
            Heure de fin: ${cours.heure_fin}`
  }

  async openModal(): Promise<Cours> {
    console.log(this.modalContent);
    this.modalReference = this.modalService.open(this.modalContent, {centered: true});
    var o = await this.modalReference.result
      .then(function () {
        console.log("VALIDATE   " + CoursFormComponent.coursToString(CoursFormComponent.coursObj));
        return CoursFormComponent.coursObj;
      });
    return o;
  }
  onCloseHandled() {
    this.modalReference.close();
  }
}
