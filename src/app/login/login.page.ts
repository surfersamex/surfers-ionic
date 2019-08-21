import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  username: string;
  password: string;

  login() {
    this.username = "";
    this.password = "";
    this.navCtrl.navigateForward("/home")
  }
}
