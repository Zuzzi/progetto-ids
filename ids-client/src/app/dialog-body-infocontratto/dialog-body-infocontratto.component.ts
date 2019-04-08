import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-body-infocontratto',
  templateUrl: './dialog-body-infocontratto.component.html',
  styleUrls: ['./dialog-body-infocontratto.component.css']
})
export class DialogBodyInfocontrattoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyInfocontrattoComponent>) { }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }




}
