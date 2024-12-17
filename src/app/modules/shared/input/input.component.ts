import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';



@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone:true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})


export class InputComponent implements ControlValueAccessor, OnInit {


  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  type = input.required<'text' | 'number' | 'password' | 'email'>();
  placeholder = input.required<string>();
  control = input<FormControl>();
  icon = input<string>();
  errorMessage: string = '';
  closedEye: boolean = true;
  touched: boolean = false;
  disabled: boolean = false;
  value: string = '';
  errorMessages: any = input({
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    pattern: 'Invalid format.',
  });


  ngOnInit(): void {
    if (this.control()) {
      this.control()?.statusChanges.subscribe((status) => {
        console.log(status);
        
        this.validateInput();
      });
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.validateInput();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.touched = true;
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }


  validateInput() {
    if (this.control()?.hasError('email') && this.control()?.dirty) {
      this.errorMessage = this.errorMessages()?.email;
    } else if (this.control()?.hasError('required') && this.control()?.dirty) {
      this.errorMessage = this.errorMessages()?.required;
    } else if (this.control()?.hasError('pattern') && this.control()?.dirty) {
      this.errorMessage = this.errorMessages()?.pattern;
    } else if (this.control()?.hasError('password') && this.control()?.dirty) {
      this.errorMessage = this.errorMessages()?.password;
    } else if (this.control()?.hasError('minlength') && this.control()?.dirty) {
      const minLength = this.control()?.getError('minlength')?.requiredLength;
      this.errorMessage = this.errorMessages()?.minlength + minLength;
    } else {
      this.errorMessage = '';
    }
  }

  toggleEye(): void {
    this.closedEye = !this.closedEye;
  }

  markAsTouched(): void {
    this.touched = true;
    this.onTouched();
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.validateInput(); 
    this.onChange(this.value); 
  }
}
