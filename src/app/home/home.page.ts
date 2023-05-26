import { Component } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasAccount = false;
  currentImage?= "";
  imageData? = "";


  constructor(private emailComposer: EmailComposer) {}

  async checkAccount(){
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async captureImage(){
    const image= await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.imageData = image.base64String;
    this.currentImage = `data:image/jpg;base64,${image.base64String}`;
  }

  async openEmail(){
    const email:  EmailComposerOptions = {
      to: 'jonyvegapjv@gmail.com',
      cc: 's18120160@alumnos.itsur.edu.mx',
      attachments: [`base64:image.jpg,$this.imageData`],
      subject: 'imagen chida',
      body: 'tire paro profe pasenos la materia :C',
      isHtml: true
    };

    await this.emailComposer.open(email);
  }

}
