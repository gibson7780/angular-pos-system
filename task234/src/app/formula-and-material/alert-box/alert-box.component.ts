import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  constructor(public confirmDialogRef: MatDialogRef<FormulaAndMaterialComponent>,
     private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }
  closeDialog() {
    this.confirmDialogRef.close(true);
  }
}
