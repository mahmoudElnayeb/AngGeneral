import { Routes } from '@angular/router';
import { AuthPage } from './modules/authentication/pages/auth-page/auth.page';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegisterComponent } from './modules/authentication/components/register/register.component';

export const routes: Routes = [
    {
     path:'', 
     redirectTo:'auth',
     pathMatch:'full'
    },
    {
        path:'auth',
        component:AuthPage, 
        children:[
            {
                path:'', 
                redirectTo:'login',
                 pathMatch:'full'
            },
            {
            path:'login',
            component:LoginComponent
        },{
            path:'register', 
            component:RegisterComponent
        }]
    }
];
