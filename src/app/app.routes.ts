import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'saveCharacter',
    loadComponent: () => import('./pages/create-character/create-character.page').then( m => m.CreateCharacterPage)
  },
];
