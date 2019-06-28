import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

// TODO: sto component non ha motivo di esistere

@Component({
  selector: 'app-dialog-body-approvazione',
  templateUrl: './dialog-body-approvazione.component.html',
  styleUrls: ['./dialog-body-approvazione.component.css']
})
export class DialogBodyApprovazioneComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyApprovazioneComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }

}
