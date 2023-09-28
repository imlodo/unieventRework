import { Injectable } from '@angular/core';
import *  as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  key = '';

  constructor() {
    if(!localStorage.getItem("rk")){
      this.generateRandomKey();
      this.clearData();
      localStorage.setItem("rk",this.key);
    } else {
      this.key = localStorage.getItem("rk");
    }
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  private generateRandomKey() {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    this.key = outString;
  }

}
