import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveToLocalStorage(key: string, value: any) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  }

  public retrieveInfoFromStorage(key: string) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key)!);
    }
    return null;
  }

  public clearStorage() {
    localStorage.clear();
  }
}
