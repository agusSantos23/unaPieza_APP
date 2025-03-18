import { Location } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline } from 'ionicons/icons';


@Component({
  selector: 'app-btn-circle',
  standalone: true,
  templateUrl: './btn-circle.component.html',
  styleUrls: ['./btn-circle.component.scss'],
  imports: [IonFab, IonFabButton, IonIcon]
})
export class BtnCircleComponent  implements OnInit {
  protected router = inject(Router)
  protected location = inject(Location)


  @Input() type?: 'add' | 'back';

  constructor() { 
    addIcons({add,arrowBackOutline});
  }

  ngOnInit() {

  }

  redirectToSaveCharacter() {
    this.router.navigate(['/saveCharacter']);
  }

  redirectBack(){
    this.location.back();
  }

}
