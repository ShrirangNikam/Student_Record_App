import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  studentForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      Name: ['', Validators.required],
      RollNumber: ['', Validators.required],
      Class: ['', Validators.required],
      Division: ['', Validators.required],
      Date: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.studentForm.controls['Name'].setValue(this.editData.Name);
      this.studentForm.controls['RollNumber'].setValue(
        this.editData.RollNumber
      );
      this.studentForm.controls['Class'].setValue(this.editData.setValue);
      this.studentForm.controls['Division'].setValue(this.editData.Division);
      this.studentForm.controls['Date'].setValue(this.editData.Date);
    }
  }

  addStudent() {
    if (this.editData) {
      if (this.studentForm.value)
        this.api.postStudent(this.studentForm.value).subscribe({
          next: (res) => {
            alert('Student added successfully');
          },
          error: (err) => {
            alert('Error while adding the student');
          },
        });
    } else {
      this.updateStudent();
    }
  }
  updateStudent() {
    this.api.putStudent(this.studentForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Student updated successfully');
        this.studentForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('Error while updating the student record!!');
      },
    });
  }
}
