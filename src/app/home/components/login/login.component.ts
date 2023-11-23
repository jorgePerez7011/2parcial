import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenInterface } from './../../../interface/token-interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private fb : FormBuilder, private  auth : AuthService ,  private act : Router){}

  ngOnInit(): void {

    const token = localStorage.getItem("token_auth");
    if(token){
      this.act.navigate(["producto"]);
    }
  }
  form = this.fb.group({
    email : [""],
    password: [""]
  });

  enviar(){
    this.auth.getToken(this.form.value).subscribe((arg : TokenInterface) => {
      localStorage.setItem('token_auth',arg.access_token);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login exitoso',
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
      this.act.navigate(["producto"])

    },(err : any)=>{
      console.log(err);
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'logueo incorrecto',
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
    });

  }

}
