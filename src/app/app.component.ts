import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  loginForm: FormGroup;
  visualizzaForm = true;

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
  this.visualizzaForm = false;

}


}
