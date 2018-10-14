import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  @ViewChild(Slides)
  slides: Slides;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    this.slides.paginationType = "progress";
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  showInput() {
    this.alertCtrl
      .create({
        title: "Ingrese usuario",
        inputs: [
          {
            name: "username",
            placeholder: "Username"
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Ingresar",
            handler: data => {
              this.checkUser(data.username);
            }
          }
        ]
      })
      .present();
  }

  checkUser(userKey: string) {
    let loading = this.loadingCtrl.create({
      content: "Verificando"
    });

    loading.present();

    this.userProvider.checkUser(userKey).then(response => {
      loading.dismiss();
      if (response) {
        this.toggleSlides();
      } else {
        this.alertCtrl
          .create({
            title: "Usuario incorrecto",
            subTitle:
              "Por favor ingrese nuevamente la clave o hable al administrador.",
            buttons: ["Aceptar"]
          })
          .present();
      }
    });
  }

  toggleSlides() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = true;
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  signIn() {
    this.navCtrl.setRoot(HomePage);
  }
}
