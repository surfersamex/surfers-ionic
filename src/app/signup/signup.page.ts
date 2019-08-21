import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;

  signUp() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.dateOfBirth = "";
    this.phone = "";;
    this.ssn = "";
    this.username = "";
    this.password = "";
    this.navCtrl.navigateForward("/home")
  }

}
