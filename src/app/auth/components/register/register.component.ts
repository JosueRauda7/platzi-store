import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  login(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;
      this.authService.createUser(value.correo, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

}
