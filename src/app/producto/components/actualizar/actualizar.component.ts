import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoComponent } from '../../pages/producto/producto.component';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent {

  proEdit: any;
  id: string = '';

  editForm: FormGroup = new FormGroup({
    title : new FormControl(),
    price : new FormControl(),
    image : new FormControl()
  });

  constructor(

    private service : ServiceService,
    private dialogRef : MatDialogRef<ActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {

  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getProduct(this.id);
  }
  closeModal(){
    this.dialogRef.close();
  }
  getProduct(id: any){
   this.service.getOne(id).subscribe(
     (res :any)=>{
      this.editForm.patchValue({
        title: res.title,
        price: res.price,
        image: res.images[0]
      });
      }
   )
  }

  edit(){
    if (this.editForm.valid) {
      const data = {
        title: this.editForm.get('title')?.value,
        price: this.editForm.get('price')?.value,
        images: [this.editForm.get('image')?.value],
      }

      this.service.putProducto(this.id, data).subscribe(
        (resp) => {
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'producto editado',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            container: 'my-swal-container',
            title: 'my-swal-title',
            icon: 'my-swal-icon',
          },
          background: '#E6F4EA',
          })
          this.dialogRef.close();
          this.editForm.reset();
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

}
