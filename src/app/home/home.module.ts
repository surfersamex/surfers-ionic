import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GenericModalPage } from './modal/add.business.modal.page';
import { SignupPage } from '../signup/signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, GenericModalPage, SignupPage],
  entryComponents: [GenericModalPage, SignupPage]
})
export class HomePageModule {}
