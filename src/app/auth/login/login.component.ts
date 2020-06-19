import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { MessagesService } from '../../providers/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuild: FormBuilder,
    private serviceAuth: AuthService,
    private serviceMessage: MessagesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const data = this.loginForm.value;

    this.serviceAuth.loginUser(data).subscribe(
      (response) => {
        const userData = this.serviceAuth.getUserDataSession();
        this.serviceMessage.success(`Wellcome`, userData.username);
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 1500);
      },
      (error) => {
        this.serviceMessage.error('Error! Something has gone wrong.');
      }
    );
  }

  private resetForm() {
    this.loginForm.reset();
  }

  private initForm() {
    this.loginForm = this.formBuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
