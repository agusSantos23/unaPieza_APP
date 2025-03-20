import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnCircleComponent } from "../../components/btn-circle/btn-circle.component";
import { IonInput, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/angular/standalone';
import { ApiUnaPiezaService } from '../../api-una-pieza.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils.service';
import { Character } from 'src/app/models/character.model';



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
    whichFruit: new FormControl(''),
  })

  selectedCharacter!: Character;

  isSend: boolean = false;

  constructor(
    private apiService: ApiUnaPiezaService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.selectedCharacter = history.state.character;
    if (this.selectedCharacter) {
      this.fillForm(this.selectedCharacter)
    }
  }


  save() {
    this.isSend = true;

    if (this.characterForm.valid) {
      const characterData = this.characterForm.value;

      if (characterData.whichFruit && characterData.whichFruit.trim() !== '') {
        characterData.whichFruit = this.utilsService.convertStringToFruits(characterData.whichFruit);
      } else {
        characterData.whichFruit = '[]';
      }


      if (!this.selectedCharacter) {

        this.apiService.saveCharacter(characterData).subscribe({
          next: () => {
            this.characterForm.reset();
            this.isSend = false;

            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error al guardar los datos', error);
          },
        });

      }else{

        this.apiService.

      }

    }else {
      alert(`Formulario con errores: ${this.characterForm}`);
    }

  }



  fillForm(character: Character) {

    console.log(character)

    if (character.devil_fruits) {
      console.log(character.devil_fruits);


      character.devil_fruits = this.utilsService.convertFruitsToString(character.devil_fruits)
    }


    this.characterForm.patchValue({
      name: character.name,
      gender: character.gender,
      band: character.band,
      level: character.level,
      ateDevilFruit: character.ateDevilFruit === 1,
      whichFruit: character.devil_fruits
    });
  }


  edit() {


  }



}
