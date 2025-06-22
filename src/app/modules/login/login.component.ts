import { Component } from '@angular/core';
import { LoginModule } from "./login.module";

@Component({
  selector: 'app-login',
  imports: [LoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

}
