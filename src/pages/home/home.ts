import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number;
  lng: number;
  title: string;
  user: any = {};
  constructor(
    public navCtrl: NavController,
    private locationPrv: LocationProvider,
    private userProv: UserProvider
    
    ) {
    
    this.locationPrv.getCurrentLocation();
    this.locationPrv.initUser();
  }

  ionViewDidLoad() {
    this.locationPrv.user.valueChanges().subscribe(data => {
      this.user = {
        name: data.name,
        lat: data.position.latitude,
        lng: data.position.longitude
      };
    });
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
    this.locationPrv.stopWatcher();
    this.userProv.removeUser();
  }

}
