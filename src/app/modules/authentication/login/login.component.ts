import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        console.log('%c⧭', 'color: #ff0000', data);
        this.userService.setToken(data.token);
    
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Access granted',
          showConfirmButton: false,
          timer: 2100,
          timerProgressBar: true,
          // didOpen: () => {
          //   Swal.showLoading()
          //   const b = Swal.getHtmlContainer().querySelector('b');
          //   timerInterval = setInterval(() => {
          //     b.textContent = Swal.getTimerLeft();
          //   }, 100);
          // },
          willClose: () => {
           
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
            this.router.navigateByUrl('/home');
          }
        });




      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Incorrect password',
          showConfirmButton: false,
          timer: 2100,
          timerProgressBar: true,
    
          willClose: () => {

          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
        
          }
        });
        console.log(error);
      });
  }

}
