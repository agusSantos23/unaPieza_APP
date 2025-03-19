import { Component, OnInit } from '@angular/core';

import { CharacterComponent } from "../character/character.component";
import { BtnCircleComponent } from "../btn-circle/btn-circle.component";
import { ApiUnaPiezaService } from '../api-una-pieza.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [BtnCircleComponent, CharacterComponent],
})
export class HomePage implements OnInit{
  characterData: any;
  updateCharacterTriggerSubscription!: Subscription;

  constructor(
    private apiService: ApiUnaPiezaService,
  ) {}

 
  ngOnInit() {}

  ionViewWillEnter() {
    this.loadCharacterData()
  }

  loadCharacterData() {
    this.apiService.viewCharacters().subscribe({
      next: (response) => this.characterData = response,
      error: (error) => console.error('Error:', error)
    });
  }


 
}
