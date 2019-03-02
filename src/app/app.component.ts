import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { MatDialog} from '@angular/material';
import { DialogBodyLoginComponent } from './dialog-body-login/dialog-body-login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './layout-first-page/vendor/bootstrap/css/bootstrap.min.css',
    './layout-first-page/vendor/fontawesome-free/css/all.min.css',
    './layout-first-page/vendor/simple-line-icons/css/simple-line-icons.css',
    './layout-first-page/css/stylish-portfolio.min.css',
]
})


export class AppComponent implements OnInit {
  loginForm: FormGroup;
  visualizzaForm = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }

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


openDialog() {
  // const ogConfig = new MatDialogConfig();
  // dialogConfig.data = 'some data';
  const dialogRef = this.dialog.open(DialogBodyLoginComponent);
  dialogRef.afterClosed().subscribe(value => {
    console.log(`Dialog sent: ${value}`);
    this.visualizzaForm = false;
  });
}


}
