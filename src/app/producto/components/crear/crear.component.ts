import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {

  constructor(
    private service : ServiceService,
    private dialogRef : MatDialogRef<CrearComponent>,
    ) {}

  saveForm: FormGroup = new FormGroup({
    title : new FormControl(),
    price : new FormControl(),
    image : new FormControl(),
    description : new FormControl()
  });

  save(){
    if (this.saveForm.valid) {
      const data = {
        title: this.saveForm.get('title')?.value,
        price: this.saveForm.get('price')?.value,
        description :this.saveForm.get('description')?.value,
        categoryId : 2,
        images: [this.saveForm.get('image')?.value],
      }

      this.service.postProducto( data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'producto agregado',
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
            },
            background: '#E6F4EA',
          });
          this.dialogRef.close();
          this.saveForm.reset();
        },
        (ERR :any)=> {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Error intente de nuevo',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
              popup: 'my-swal-popup',
             },
           })
        }
       );
    }


  }

  closeModal(){
    this.dialogRef.close();
  }

}
