import { Routes } from '@angular/router';
import { Busca } from './busca/busca';
import { Cadastro } from './cadastro/cadastro';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';
import { Esqueci } from './esqueci/esqueci';
import { Login } from './login/login';
import { Vitrine } from './vitrine/vitrine';

export const routes: Routes = [
    {path:"", redirectTo:"Vitrine", pathMatch:"full"},
    {path:"busca", component:Busca}, {path:"Cesta", component:Cesta},
    {path:"Detalhe/:id", component:Detalhe}, {path:"Detalhe", redirectTo:"Detalhe/1", pathMatch:"full"}, {path:"Esqueci", component:Esqueci},
    {path:"Login", component:Login}, {path:"login", redirectTo:"Login", pathMatch:"full"}, {path:"Cadastro", component:Cadastro}, {path:"cadastro", redirectTo:"Cadastro", pathMatch:"full"}, {path:"Vitrine", component:Vitrine}

];
