import { Component, Inject } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent {

  id: string = '';
  product:any;
  constructor(

    private service : ServiceService,
    private dialogRef : MatDialogRef<VerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit(): void{
    this.id = this.data.id;
    this.service.getOne(this.id).subscribe(
      (res :any)=>{
       this.product = res;
       }
    )
  }
  close(){
    this.dialogRef.close();
  }
}
