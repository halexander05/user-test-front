import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { MessagesService } from '../../providers/messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newForm: FormGroup;

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
    const data = this.newForm.value;
    this.userRegister(data);
  }

  private userRegister(data: any) {
     this.serviceAuth.addUser(data).subscribe(
      (response) => {
        this.serviceMessage.success(
          'Congratulations!! You have successfully registered'
        );
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500)
      },
      (err) => {
        this.resetForm();
        this.serviceMessage.error('Error! Something has gone wrong.');
      }
    ); 
  }

  private resetForm(){
    this.newForm.reset();
  }

  private initForm() {
    this.newForm = this.formBuild.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
