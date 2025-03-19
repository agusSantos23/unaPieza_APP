import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  ToastController
} from '@ionic/angular/standalone';
import { ApiUnaPiezaService } from '../api-una-pieza.service';
import { UtilsService } from '../utils.service';
import { Router } from '@angular/router';

export interface Character{
  id: number | undefined;
  name: string;
  gender: 'male' | 'female' | 'unknown'
  band: 'pirate' | 'marine' | 'unknown';
  level: 'low' | 'medium' | 'high';
  ateDevilFruit: boolean;
  whichFruit?: string
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
  @Output() deleteCharacter = new EventEmitter<void>();

  constructor(
    private apiService: ApiUnaPiezaService,
    private utilService: UtilsService,
    private toastController: ToastController,
    private router: Router

  ) { }

  ngOnInit() {}

  updateCharacter(id: number | undefined){

    if (window.confirm("you want to edit this character?")) {
      
      this.apiService.findCharacter(id).subscribe({
        next: (character: Character) => {
          
          this.utilService.updateSelectedCharacter(character);
          
          this.router.navigate(['saveCharacter']);

        }
      })
    }

  }

  delete(id: number|undefined){

    if (window.confirm("you want to delete this character?")) {

      this.apiService.deleteCharacter(id).subscribe({
        next: async (response) => {     
          const toast = await this.toastController.create({
            message: response.message,
            duration: 1500,
            position: "top",
          });
          await toast.present();  

          this.deleteCharacter.emit()
        },
        error: (error) => {
          console.error("Error", error)
        }
      })
    }
  }

}
