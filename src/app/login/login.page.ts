import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ViewController } from "../../../node_modules/@ionic/core";

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
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  login() {
    this.username = "";
    this.password = "";
    this.storage.set("loggedIn", "true");
    this.modalCtrl.dismiss('true');
  }
}
