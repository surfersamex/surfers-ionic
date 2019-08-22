import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-business-modal',
  templateUrl: './add.business.modal.page.html',
  styleUrls: ['../home.page.scss'],
})
export class GenericModalPage implements OnInit {

    businessName:String;
    addressline:String;
    city:String;
    state:String;
    zipCode:String;
    hours:String;
    description:String;

  constructor(private modalController: ModalController, private navParams: NavParams){}

  ngOnInit() {
    console.table(this.navParams);
  }

  addBusiness(form:NgForm){
      this.businessName = form.value.businessName;
      this.addressline = form.value.addressline;
      this.city = form.value.city;
      this.state = form.value.state;
      this.zipCode = form.value.zipCode;

      let req = {
          "businessName": form.value.businessName,
          "addressLine": form.value.addressline,
          "city": form.value.city,
          "state": form.value.state,
          "zipCode": form.value.zipcode,
          "hours": form.value.hours,
          "description": form.value.description
      };

      console.log("request sending... " + JSON.stringify(req));
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
