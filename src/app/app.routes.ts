import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login'),
    },
    {
        path: 'Perfil-do-aluno',
        loadComponent: () => import('./pages/student-profile/student-profile'),
    },
    {
        path: 'atualizar-perfil',
        loadComponent: () => import('./pages/update-profile/update-profile'),
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./pages/register/register'),
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home'),
    },
    {
        path: 'frequencia',
        loadComponent: () => import('./pages//attendance/attendance'),
    },
    
];
