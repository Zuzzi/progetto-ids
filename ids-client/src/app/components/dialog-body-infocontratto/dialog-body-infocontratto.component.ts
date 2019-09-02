import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfoContratto } from '@app/interfaces';

@Component({
  selector: 'app-dialog-body-infocontratto',
  templateUrl: './dialog-body-infocontratto.component.html',
  styleUrls: ['./dialog-body-infocontratto.component.css']
})
export class DialogBodyInfocontrattoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyInfocontrattoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogInfoContratto) { }

  ngOnInit() {
  }


  close(): void {
    this.dialogRef.close();
  }




}
