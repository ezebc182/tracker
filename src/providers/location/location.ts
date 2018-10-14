import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserProvider } from '../user/user';
import * as firebase from "firebase/app";
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LocationProvider {
  user: AngularFirestoreDocument<any>;
  private watch: Subscription;

  constructor(
    private afDB: AngularFirestore,
    private userProv: UserProvider,
    private geolocation: Geolocation) {
    this.watch = new Subscription();
	}
	
	initUser() {
		this.user = this.afDB.doc(`/users/${this.userProv.key}/`);
	}

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.updateLocation(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.watch = this.geolocation.watchPosition()
    .subscribe((data) => {
      this.updateLocation(data);
    });
  }

  private updateLocation(newLocation) {
    this.user.update({
      key: this.userProv.key,
      position: new firebase.firestore.GeoPoint(newLocation.coords.latitude, newLocation.coords.longitude)
      
    })
  }

  stopWatcher() {
    try {
      this.watch.unsubscribe();
    } catch(e) {
      console.error(JSON.stringify(e));
    }
  }
}
