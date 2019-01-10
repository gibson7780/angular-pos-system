import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormulaAndMaterialComponent } from '../formula-and-material.component';

@Component({
  selector: 'app-alert-material',
  templateUrl: './alert-material.component.html',
  styleUrls: ['./alert-material.component.css']
})
export class AlertMaterialComponent implements OnInit {

  constructor(public createMaterialDialogRef: MatDialogRef<FormulaAndMaterialComponent>, private dialog: MatDialog) { }

  ngOnInit() {
  }
  closeDialog() {
    this.createMaterialDialogRef.close(true);
  }
}
