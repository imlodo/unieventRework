import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

const ENCRYPT_PARAMETERS = true;
const URI_ENCODE_PARAMETERS = false;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  paramsSecret: string;

  constructor() {
    this.paramsSecret = '6QtxgFdnb9bBGm@7[s<A8h]X+%$B%FY&2*';
  }

  removeEmpty = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        this.removeEmpty(obj[key]);
      } else if (obj[key] == null) {
        delete obj[key];
      } else if ((obj[key] instanceof Array) && (obj[key].length === 0)) {
        delete obj[key];
      }
    });
  }

  public encodeParams(params: any): string {
    this.removeEmpty(params);
    params[' '] = new Date().getTime();
    //params['  '] = this.authService.getDomainUser();
    if (ENCRYPT_PARAMETERS) {
      return CryptoJS.AES.encrypt(JSON.stringify(params), this.paramsSecret).toString();
    }
    if (URI_ENCODE_PARAMETERS) {
      return encodeURI(JSON.stringify(params));
    }
    return btoa(JSON.stringify(params));
  }

  public decodeParams(sparams: string): any {
    if (sparams) {
      let params;
      if (ENCRYPT_PARAMETERS) {
        params = JSON.parse(CryptoJS.AES.decrypt(sparams, this.paramsSecret).toString(CryptoJS.enc.Utf8));
      } else if (URI_ENCODE_PARAMETERS) {
        params = JSON.parse(decodeURI(sparams));
      } else {
        params = JSON.parse(atob(sparams));
      }
      /*const loggedDomainUser = this.authService.getDomainUser() || '';
      const domainUser = params && params['  '] || ' ';
      if (loggedDomainUser === domainUser) {
        delete params[' '];
        delete params['  '];
        return params;
      }*/
      return params;
    }
    return {};
  }
}
