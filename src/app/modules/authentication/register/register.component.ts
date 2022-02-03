import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email!: string;
  password!: string;
  confirmPassword!: string;
  
  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  register() {
    const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe((data: any) => {
      console.log('%c⧭', 'color: #00e600', data);
      this.userService.setToken(data.token);
    });
  }

}
