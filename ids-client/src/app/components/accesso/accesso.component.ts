import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accesso',
  templateUrl: './accesso.component.html',
  styleUrls: ['./accesso.component.css']
})
export class AccessoComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    console.log('funziona!');
    console.log(this.loginForm.controls.username.value);
    console.log(this.loginForm.controls.password.value);
    this.router.navigate(['/area-riservata']);

  }
}
