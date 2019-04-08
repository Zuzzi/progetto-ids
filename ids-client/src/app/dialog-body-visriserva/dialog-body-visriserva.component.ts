import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-body-visriserva',
  templateUrl: './dialog-body-visriserva.component.html',
  styleUrls: ['./dialog-body-visriserva.component.css']
})
export class DialogBodyVisriservaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyVisriservaComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
