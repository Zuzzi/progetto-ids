import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-body-login',
  templateUrl: './dialog-body-login.component.html',
  styleUrls: ['./dialog-body-login.component.css']
})
export class DialogBodyLoginComponent implements OnInit {


  username: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<DialogBodyLoginComponent>) { }

  ngOnInit() {
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.dialogRef.close();
    this.dialogRef.close('Thanks for using me!');
  }



}
