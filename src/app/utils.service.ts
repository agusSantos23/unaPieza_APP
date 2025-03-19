import { Injectable } from '@angular/core';
import { Character } from './character/character.component';
import { distinctUntilChanged, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private selectedCharacterSource = new Subject<Character | undefined>();
  selectedCharacter$ = this.selectedCharacterSource.asObservable().pipe(
    distinctUntilChanged() 
  );

  constructor() {}

  updateSelectedCharacter(character: Character | undefined) {
    this.selectedCharacterSource.next(character ? character : undefined);
  }
 
}
