import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {
  constructor () {}

  getToken(tokenKeyName): String {
    return !!window.localStorage[tokenKeyName]
      ? JSON.parse(window.localStorage[tokenKeyName])
      : undefined;
  }

  setToken(token, tokenKeyName) {
    window.localStorage[tokenKeyName] = JSON.stringify(token);
  }

  removeToken(tokenKeyName) {
    window.localStorage.removeItem(tokenKeyName);
  }

}
