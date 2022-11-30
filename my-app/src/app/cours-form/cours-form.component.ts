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
import {Calendar} from "@fullcalendar/core";

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})

export class CoursFormComponent implements OnInit{

  @ViewChild('content', { static: true }) modalContent!: ElementRef;
  static coursObj: Cours;
  ourform!: FormGroup;
  display = "none";
  modalReference!: NgbModalRef;
  startTimeSelect!: string;
  endTimeSelect!: string;

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
  }


  addCours() {
    console.log(this.ourform!.value);
    const formValues = this.ourform!.value;
    CoursFormComponent.coursObj = {
      idCours: 0,
      nomCour: formValues.nomCour,
      heure_debut: this.startTimeSelect,
      heure_fin: this.endTimeSelect,
      /*classe: null,
      enseignement: {},
      salleClasse: {},
      jourCours: {}*/ //TODO ajouter les elements dans cour
    };
    console.log("ADDING   " + CoursFormComponent.coursToString(CoursFormComponent.coursObj));
    this.cs.add(CoursFormComponent.coursObj);
    this.ourform!.reset();
  }

  static coursToString(cours: Cours){
    return `
            Nom: ${cours.nomCour}
            Heure de début: ${cours.heure_debut}
            Heure de fin: ${cours.heure_fin}
            classe: ${cours.classe}
            enseignement: ${cours.enseignement}
            salleClasse: ${cours.salleClasse}
            jourCours: ${cours.jourCours}`
  }

  async openModal(startStr: string, endStr: string): Promise<Cours> {
    console.log(this.modalContent);
    this.startTimeSelect = startStr;
    this.endTimeSelect = endStr;
    this.ourform.controls['heure_debut'].setValue(this.startTimeSelect);
    this.ourform.controls['heure_fin'].setValue(this.endTimeSelect);
    this.modalReference = this.modalService.open(this.modalContent, {centered: true});
    var o = await this.modalReference.result
      .then(function () {
        console.log("VALIDATE   " + CoursFormComponent.coursToString(CoursFormComponent.coursObj));
        return CoursFormComponent.coursObj;
      });
    return o;
  }
  onCloseHandled(doAdd: boolean) {
    if(doAdd) {
      this.addCours();
    }
    this.modalReference.close();
  }
}
