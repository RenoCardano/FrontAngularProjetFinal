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
import {Calendar, EventClickArg} from "@fullcalendar/core";
import {SalleClasse} from "../modele/salleclasse.modele";
import {SalleClasseService} from "../service/salle-classe.service";
import {Etablissement} from "../modele/etablissement.modele";
import {Enseignement} from "../modele/enseignement.modele";
import {EnseignementService} from "../service/enseignement.service";
import {Enseignant} from "../modele/enseignant.modele";
import {Matiere} from "../modele/matiere.modele";
import {Jour} from "../modele/jour.modele";

interface Hour {
  value: string;
  viewValue: string;
}

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
  endDaySelect!: string;
  startDaySelect!: string;
  jourSelected!: number;
  salleClasses: SalleClasse[] = [];
  enseignements: Enseignement[] = [];
  mapEnseignements = new Map<Matiere, Enseignant[]>();
  selectedMatiere!: number;
  selectedEnseignant!: Enseignant;
  selectedSalle!: number;
  currentIddCours!: number;
  delEventFunction!: Function;

  constructor(private es: EnseignementService, private scs: SalleClasseService, private cs: CoursService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    const s = this.scs.findAll().subscribe(maliste => {this.salleClasses = maliste;});
    const e = this.es.findAll().subscribe(maliste => {this.enseignements = maliste;},error => {},() => {
      this.enseignements.forEach((value) =>{
        let done = false;
        Array.from(this.mapEnseignements.keys()).forEach((v: Matiere)=>{
          // @ts-ignore
          if(v.id === value.matiereEnseignee.id){
            // @ts-ignore
            this.mapEnseignements.get(v).push(value.enseignant);
            done = true;
            return;
          }
        });
        if(!done) {
          if (value.matiereEnseignee) {
            // @ts-ignore
            this.mapEnseignements.set(value.matiereEnseignee, [value.enseignant]);
          }
        }
      });
    });

    this.ourform! = this.fb.group({
      idCours: [],
      nomCour: [, Validators.required],
      heure_debut: [, Validators.required],
      heure_fin: [, Validators.required],
      matiere: [],
      enseignant: [],
      classe: [],
      salleClasse: [],
      jourCours: [],
    });
  }

  findEnseignement(enseignant: Enseignant, matiereEnseignee: Matiere): Enseignement {
    // @ts-ignore
    let a =  this.enseignements.find(v => v.enseignant?.idEns === enseignant && v.matiereEnseignee?.id === matiereEnseignee);
    // @ts-ignore
    return a;
  }

  get getBindedEnseignementsMatieres(){
    return Array.from(this.mapEnseignements.keys());
  }

  getBindedEnseignementsEnseignement(id: number){
    // @ts-ignore
    return this.mapEnseignements.get(Array.from(this.mapEnseignements.keys()).find(v => v.id === id));
  }

  addCours(update: boolean) {
    const formValues = this.ourform!.value;
    CoursFormComponent.coursObj = {
      idCours: this.currentIddCours,
      nomCour: formValues.nomCour,
      heure_debut: this.startDaySelect+formValues.heure_debut,
      heure_fin: this.endDaySelect+formValues.heure_fin,
      classe: formValues.classe,
      enseignement: this.findEnseignement(formValues.enseignant,formValues.matiere),
      // @ts-ignore
      salleClasse: this.salleClasses.find(v => v.idSalleClasse === formValues.salleClasse),
      jourCours: {
        idJour: this.jourSelected
      }
    };
    if(update){
      this.cs.update(CoursFormComponent.coursObj);
      this.delEventFunction();
    }else{
      this.cs.add(CoursFormComponent.coursObj);
      window.location.reload();
    }
    this.ourform!.reset();
  }

  getDayFromInt(toSwitch: number): string {
    switch (toSwitch) {
      case 1: return "LUNDI";
      case 2: return "MARDI";
      case 3: return "MERCREDI";
      case 4: return "JEUDI";
      case 5: return "VENDREDI";
      case 6: return "SAMEDI";
      default: return "DIMANCHE";
    }
  }

  static coursToString(cours: Cours){
    return `
            ID: ${cours.idCours}
            Nom: ${cours.nomCour}
            Heure de début: ${cours.heure_debut}
            Heure de fin: ${cours.heure_fin}
            classe: ${cours.classe}
            enseignement: ${cours.enseignement}
            salleClasse: ${cours.salleClasse}
            jourCours: ${cours.jourCours}`
  }

  setupFormWithCours(cours: Cours) {
    this.currentIddCours = cours.idCours;
    this.ourform.controls['nomCour'].patchValue(cours.nomCour);
    // @ts-ignore
    this.selectedEnseignant = (cours.enseignement.enseignant as Enseignant).idEns;
    // @ts-ignore
    this.ourform.controls['enseignant'].patchValue((cours.enseignement.enseignant as Enseignant).idEns);
    // @ts-ignore
    this.selectedMatiere = (cours.enseignement.matiereEnseignee as Matiere).id;
    // @ts-ignore
    this.ourform.controls['matiere'].patchValue((cours.enseignement.matiereEnseignee as Matiere).id);
    this.selectedSalle = (cours.salleClasse as SalleClasse).idSalleClasse;
    this.ourform.controls['salleClasse'].patchValue((cours.salleClasse as SalleClasse).idSalleClasse);
    this.ourform.controls['jourCours'].patchValue((cours.jourCours as Jour));
  }

  async openModal(startStr: string, endStr: string, jour: number, cours: any, del: Function): Promise<Cours> {
    this.delEventFunction = del;
    this.currentIddCours = cours?.idCours;
      this.startDaySelect = startStr.replace(/T.*$/, '');
     this.endDaySelect = endStr.replace(/T.*$/, '');
      // @ts-ignore
      this.startTimeSelect = startStr.match(/T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/)?.pop();
      // @ts-ignore
      this.endTimeSelect = endStr.match(/T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/)?.pop();
      this.ourform.controls['heure_debut'].patchValue(this.startTimeSelect);
      this.ourform.controls['heure_fin'].patchValue(this.endTimeSelect);
      this.jourSelected = jour;
      if(cours != null) {
        this.setupFormWithCours((cours as Cours));
      }
      this.modalReference = this.modalService.open(this.modalContent, {centered: true});
    var o = await this.modalReference.result
      .then(function () {
        return CoursFormComponent.coursObj;
      });
    return o;
  }
  onCloseHandled(doAdd: boolean, doUpdate: boolean, doDelete: boolean) {
    if(doAdd) {
      this.addCours(doUpdate);
    }else if(doDelete){
      this.cs.delete(""+this.currentIddCours);
      this.delEventFunction();
    }
    this.modalReference.close();
  }

  hoursStart: Hour[] = [
    {value: 'T08:00:00', viewValue: '8:00'},
    {value: 'T09:00:00', viewValue: '9:00'},
    {value: 'T10:00:00', viewValue: '10:00'},
    {value: 'T11:00:00', viewValue: '11:00'},
    {value: 'T12:00:00', viewValue: '12:00'},
    {value: 'T13:00:00', viewValue: '13:00'},
    {value: 'T14:00:00', viewValue: '14:00'},
    {value: 'T15:00:00', viewValue: '15:00'},
    {value: 'T16:00:00', viewValue: '16:00'},
    {value: 'T17:00:00', viewValue: '17:00'},
    {value: '18:00:00', viewValue: '18:00'},
  ];

  hoursEnd: Hour[] = [
    {value: 'T09:00:00', viewValue: '9:00'},
    {value: 'T10:00:00', viewValue: '10:00'},
    {value: 'T11:00:00', viewValue: '11:00'},
    {value: 'T12:00:00', viewValue: '12:00'},
    {value: 'T13:00:00', viewValue: '13:00'},
    {value: 'T14:00:00', viewValue: '14:00'},
    {value: 'T15:00:00', viewValue: '15:00'},
    {value: 'T16:00:00', viewValue: '16:00'},
    {value: 'T17:00:00', viewValue: '17:00'},
    {value: '18:00:00', viewValue: '18:00'},
    {value: 'T19:00:00', viewValue: '19:00'},
  ];

}
