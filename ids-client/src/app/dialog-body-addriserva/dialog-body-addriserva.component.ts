import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-body-addriserva',
  templateUrl: './dialog-body-addriserva.component.html',
  styleUrls: ['./dialog-body-addriserva.component.css']
})
export class DialogBodyAddriservaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyAddriservaComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }

}
