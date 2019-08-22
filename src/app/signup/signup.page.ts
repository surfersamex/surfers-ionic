import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private toastController: ToastController,
    private modalCtrl: ModalController,
  ) { }

  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;

  ngOnInit() {
  }

  clearInputs() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.dateOfBirth = "";
    this.phone = "";
    this.ssn = "";
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

  signUp() {

    this.storage.get(this.username).then(value => {

      if (value != null) {

        this.clearInputs();
        this.showToast("Username already in use", 3000);

      } else {

        this.storage.set(this.username, JSON.stringify({  "firstName": this.firstName,
                                                          "lastName": this.lastName,
                                                          "email": this.email,
                                                          "dateOfBirth": this.dateOfBirth,
                                                          "phone": this.phone,
                                                          "ssn": this.ssn,
                                                          "password": this.password}));
        this.clearInputs();
        this.storage.set("loggedIn", "true");
        this.modalCtrl.dismiss('true');
        //this.navCtrl.navigateForward("/home");
      }
    });
  }
}
