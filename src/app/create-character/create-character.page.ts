import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnCircleComponent } from "../btn-circle/btn-circle.component";
import { IonInput, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/angular/standalone';
import { ApiUnaPiezaService } from '../api-una-pieza.service';


@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule, BtnCircleComponent, IonInput],
  providers: [ApiUnaPiezaService]
})
export class CreateCharacterPage {

  characterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    band: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    ateDevilFruit: new FormControl(false),
    whichFruit: new FormControl(''),
  })

  protected isSend: boolean = false

  constructor(private apiService: ApiUnaPiezaService) {}

  save() {
    this.isSend = true;

    if (this.characterForm.valid) {
      const characterData = this.characterForm.value; 
      console.log('Formulario completo:', characterData);

      this.apiService.saveCharacter(characterData).subscribe({
        next: (response) => {
          console.log('Datos guardados correctamente', response);
        },
        error: (error) => {
          console.error('Error al guardar los datos', error);
        },
      });

    } else {
      console.log('Formulario con errores', this.characterForm);
    }
  }

}
