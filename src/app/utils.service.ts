import { Injectable } from '@angular/core';
import { DevilFruit } from './models/devil-fruit.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 

  convertFruitsToString(fruits: string | DevilFruit[]): string {    
    if (typeof fruits !== 'string') {
      return fruits.map((fruit: DevilFruit) => fruit.name).join(', ');
    } else {
      return '';
    }
    
  }
  

  convertStringToFruits(fruitString: string | DevilFruit[]): string {
    if (typeof fruitString === 'string') {
      return JSON.stringify(fruitString.split(',').map(f => f.trim()));
    }else{
      return '';
    }
  }
  
}
