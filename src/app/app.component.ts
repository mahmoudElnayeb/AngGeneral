import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './modules/shared/input/input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "./modules/shared/header/header.component";
import { FooterComponent } from "./modules/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
   standalone: true,
})
export class AppComponent {
  title = 'myAppAngNew';
  loginForm
  constructor(private fb:FormBuilder){
    this.loginForm=this.fb.group({
      email:['', [Validators.required , Validators.email]]
    })
  }

  changeMode(): void {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
      body.setAttribute('data-theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
    }
  }

  getControl(formName:FormGroup, controlName:string):FormControl{
     return formName.get(controlName) as FormControl
  }
}
