import { Component,Input, OnInit } from '@angular/core';
import {AppareilService} from "../service/appareil.service";

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string = "";
  @Input() appareilStatus:string = "";
  @Input() indexOfAppareil: number = 0;
  @Input() id: number = 1;
  constructor(private appareilService : AppareilService) { }

  ngOnInit(): void {
  }

  getStatus() {
    return this.appareilStatus;
  }

  onSwitchOne(){
    this.appareilService.switchOnOne(this.indexOfAppareil)
  }


  getColor() {
      let color ="";
      if(this.appareilStatus === 'allumé'){
        color = 'green';
      } else  if (this.appareilStatus === 'éteint') {
        color = 'red';
      }
      return color;
  }

  onSwitchOffOne() {
    this.appareilService.switchOffOne(this.indexOfAppareil)
  }
}
