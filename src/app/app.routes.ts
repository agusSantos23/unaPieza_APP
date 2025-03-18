import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'saveCharacter',
    loadComponent: () => import('./create-character/create-character.page').then( m => m.CreateCharacterPage)
  },
];
