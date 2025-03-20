import { Component, OnInit } from '@angular/core';

import { CharacterComponent } from "../../components/character/character.component";
import { BtnCircleComponent } from "../../components/btn-circle/btn-circle.component";
import { Subscription } from 'rxjs';
import { ApiUnaPiezaService } from 'src/app/api-una-pieza.service';


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
