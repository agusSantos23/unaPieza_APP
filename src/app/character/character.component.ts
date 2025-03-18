import { Component, Input, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

interface Character{
  name:string;
  gender: 'male' | 'female' | 'unknown'
  band: 'pirate' | 'marine' | 'unknown';
  level: 'low' | 'mediun' | 'high';
  ateDevilFruit: boolean;
  whichFruit?: string[]
}


@Component({
  selector: 'app-character',
  standalone: true,
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  imports: [IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class CharacterComponent  implements OnInit {

  @Input() character?: Character;

  constructor() { }

  ngOnInit() {}

}
