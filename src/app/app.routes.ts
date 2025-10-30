import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home'),
    },
    {
        path: 'Perfil-do-aluno',
        loadComponent: () => import('./pages/student-profile/student-profile'),
    },
    {
        path: 'atualizar-perfil',
        loadComponent: () => import('./pages/update-profile/update-profile'),
    },
];
