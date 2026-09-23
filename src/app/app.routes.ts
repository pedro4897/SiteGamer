import { Routes } from '@angular/router';
import { Busca } from './busca/busca';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';
import { Esqueci } from './esqueci/esqueci';
import { Login } from './login/login';
import { Vitrine } from './vitrine/vitrine';

export const routes: Routes = [
    {path:"", redirectTo:"Vitrine", pathMatch:"full"},
    {path:"busca", component:Busca}, {path:"Cesta", component:Cesta},
    {path:"Detalhe", component:Detalhe}, {path:"Esqueci", component:Esqueci},
    {path:"Login", component:Login}, {path:"Vitrine", component:Vitrine}

];
