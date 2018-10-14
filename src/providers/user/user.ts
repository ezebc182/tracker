import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Platform } from 'ionic-angular';
/* 
import { EncryptionProvider } from '../encryption/encryption';
import { ENV } from '../../config/env.config'; 
*/
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UserProvider {
  user: any = {};
  key: string;
  currentPlatform: any;
	subscription: Subscription;

  constructor(
    private afDB: AngularFirestore,
    public platform: Platform,
    // private encryptionProvider: EncryptionProvider,
    private storage: Storage
  ) {
		this.currentPlatform = this.getPlatform();
		this.subscription = new Subscription();
  }

  checkUser(key: string) {
    const userKey = key.toLocaleLowerCase();
    return new Promise((resolve, reject) => {
			this.subscription = this.afDB
        .doc(`/users/${userKey}`)
        .valueChanges()
        .subscribe(data => {
          if (data) {
            this.user = data;
            this.key = userKey;
            this.storeUser(this.key);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  storeUser(user: any) {
    const encryptedUser = user; // this.encryptionProvider.encrypt(user, ENV.APP_KEY);
    this.currentPlatform === "cordova"
      ? this.storage.set("user", encryptedUser)
      : localStorage.setItem("user", encryptedUser);
  }

  private getPlatform() {
    return this.platform.is("cordova") ? "cordova" : "web";
  }

  loadUser() {
    return new Promise((resolve, reject) => {
      if (this.currentPlatform === "cordova") {
        this.storage.get("user").then(key => {
          console.log("key", key);
          if (key) {
            this.key = key; // this.encryptionProvider.decrypt(key, ENV.APP_KEY);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        if (localStorage.getItem("user")) {
          this.key = localStorage.getItem("user"); // this.encryptionProvider.decrypt(localStorage.getItem('user'), ENV.APP_KEY);
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  removeUser() {
    this.key = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.platform.is("cordova")) {
      this.storage.remove("user");
    } else if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
  }
}
