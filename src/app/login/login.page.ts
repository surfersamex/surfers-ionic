import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ViewController } from "../../../node_modules/@ionic/core";
import { Navigation } from 'selenium-webdriver';
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  clearInputs() {
    this.username = "";
    this.password = "";
  }

  showToast(message, duration) {
    this.toastController.create({
      message: message,
      position: 'bottom',
      animated: true,
      duration: duration
    }).then(v => {v.present();});
  }

  login() {

    this.storage.get(this.username).then(value => {
      if (value != null && JSON.parse(value).password === this.password) {
        this.clearInputs();
        this.storage.set("loggedIn", "true");
        this.modalCtrl.dismiss('true');
      } else {
        this.clearInputs();
        this.showToast("Invalid Username/Password", 3000);
      }
    });    
  }
}
