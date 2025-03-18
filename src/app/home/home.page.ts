import { Component, inject } from '@angular/core';

import { CharacterComponent } from "../character/character.component";
import { BtnCircleComponent } from "../btn-circle/btn-circle.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CharacterComponent, BtnCircleComponent],
})
export class HomePage {

  constructor() {}


 
}
