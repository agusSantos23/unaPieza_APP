import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnCircleComponent } from "../btn-circle/btn-circle.component";
import { IonInput, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/angular/standalone';
import { ApiUnaPiezaService } from '../api-una-pieza.service';
import { Router } from '@angular/router';
import { Character } from '../character/character.component';
import { UtilsService } from '../utils.service';


@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule, BtnCircleComponent, IonInput],
  providers: [ApiUnaPiezaService]
})
export class CreateCharacterPage implements OnInit {

  characterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    band: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    ateDevilFruit: new FormControl(false),
    whichFruit: new FormControl(),
  })

  characterToEdit!: Character;

  isSend: boolean = false;


  constructor(
    private apiService: ApiUnaPiezaService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilsService.selectedCharacter$.subscribe(
      (character: Character | undefined) => {
        
        if (character) {
          console.log(character);
          console.log("aaaaaa");
          
          this.characterToEdit = character;
          this.fillForm(character);
        }
      }
    );
  }

  save() {
    this.isSend = true;

    if (this.characterForm.valid) {
      const characterData = this.characterForm.value;

      if (characterData.whichFruit && characterData.whichFruit.trim() !== '') {
        const fruitsArray = characterData.whichFruit.split(', ').map((fruit: string) => fruit.trim());
        characterData.whichFruit = JSON.stringify(fruitsArray);;
      } else {
        characterData.whichFruit = '[]';
      }

      this.apiService.saveCharacter(characterData).subscribe({
        next: (response) => {
          console.log('Datos guardados correctamente', response);
          this.characterForm.reset();
          this.isSend = false;

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al guardar los datos', error);
        },
      });

    } else {
      console.log('Formulario con errores', this.characterForm);
    }
  }

  fillForm(character: Character) {
    
    if (character.whichFruit) {
      const whichFruitArray = JSON.parse(character.whichFruit);
      character.whichFruit = whichFruitArray.length ? whichFruitArray.join(', ') : ''
    }    
    
    this.characterForm.patchValue({
      name: character.name,
      gender: character.gender,
      band: character.band,
      level: character.level,
      ateDevilFruit: character.ateDevilFruit,
      whichFruit: character.whichFruit
    });
  }


  edit() {

  }



}
